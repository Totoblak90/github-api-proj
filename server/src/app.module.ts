import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { PrismaModule } from './prisma/prisma.module';
import { GithubService } from './github/github.service';
import { PrismaService } from './prisma/prisma.service';
import { RepoDBResponse, GithubCommitFullResponse, Commit, PrismaCommit } from './interfaces';
import { take } from 'rxjs/operators';
import { CommitsModule } from './commits/commits.module';
import { RepositoriesModule } from './repositories/repositories.module';


@Module({
  imports: [
    GithubModule, ConfigModule.forRoot({
      isGlobal: true
    }), 
    PrismaModule, 
    CommitsModule, 
    RepositoriesModule
  ],
})
export class AppModule implements OnApplicationBootstrap {

  constructor(private githubService: GithubService, private prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    const repos = await this.prismaService.repository.findMany()
    const commits = await this.prismaService.commit.findMany()

    if (!repos.length || !commits.length) {
      await this.addRepos();
      await this.addCommits();
    }
  }

  addRepos() {
    return new Promise<boolean>((resolve, reject) => {
      this.githubService.getPublicRepositories().pipe(take(1)).subscribe({
        next: async (repoList) => {
            for (const record of repoList) {

                const existingRecord = await this.prismaService.repository.findUnique({ where: {repo_id: record.id}})
                if (!existingRecord) {
                  await this.prismaService.repository.create({ data: {
                      repo_id: record.id,
                      name: record.name,
                      user_name: record.user_name,
                      description: record.description,
                      route: record.route
                    } 
                  })
                }
                
            }
            resolve(true)
        },
        error: (err) => {
          console.log(err.response.data)
          const rateLimits: {[key: string]: any} = {
            x_ratelimit_limit: err.response.headers['x-ratelimit-limit'],
            x_ratelimit_remaining: err.response.headers['x-ratelimit-remaining'],
            x_ratelimit_reset: err.response.headers['x-ratelimit-reset'],
            x_ratelimit_used: err.response.headers['x-ratelimit-used'],
          }
          console.log(rateLimits, 'add repos')
          reject(false)
        }
      })
    })
  }

  /* 
   * IDEA FOR PAGINATION
   * 
   * Here it would be good to add pagination for all those repositories that have more than 100 commits, 
   * due to time constraints I can't do it but I'll write down how I would do it. 
   * Because of the way I approached the project, which is to load all existing commits and save them in a database, 
   * when requesting the commits of a specific repository from Github, I would check if it has 100 commits. If that is the case, 
   * I would request the next page of commits and check the number of commits in that response again. If it has 100, 
   * I would request the next page and so on. I could easily do this with a recursive function.
   *
   * Then, from the front-end and already having all the commits that I need saved in the database and associated with the corresponding repository, 
   * I would set a limit of 100 for the query that returns the commits of a repository to avoid sending too much data to the front-end and keep everything managed from the server. 
   * If a repository has more than 100 commits, I could create a function on the server to paginate the items, 
   * and all I would have to do from the front-end is change the page number. Prisma has a very simple way to do pagination.
   * Here is a possible example (Not applicable for this case, but an idea of how the code could look like):
   * 
   *    @Get()
   *    async commitPagination(
   *      @Query('page') page: number = 1,
   *      @Query('limit') limit: number = 100,
   *    ): Promise<Commit[]> {
   *       const commits = await this.prisma.commit.findMany({
   *         skip: (page - 1) * limit,
   *         take: limit,
   *       });
   *       return commits;
   *    }
  */

  // I created a recursive function to increase the time between requests to the Github API due to the ratelimit issue. 
  addCommits(index = 0) {
    return new Promise<boolean>(async (resolve, reject) => {
      const repos: RepoDBResponse[] = await this.prismaService.repository.findMany();
      if (index < repos.length) {
        this.githubService.getCommitHistory(repos[index].name).pipe(take(1)).subscribe({
          next: async (commitList: GithubCommitFullResponse[]) => {
            await this.createCommitIfExists(commitList, repos[index].repo_id)
            await this.addCommits(index + 1);
          },
          error: (err) => {
            console.log(err.response.data)
            const rateLimits: {[key: string]: any} = {
              x_ratelimit_limit: err.response.headers['x-ratelimit-limit'],
              x_ratelimit_remaining: err.response.headers['x-ratelimit-remaining'],
              x_ratelimit_reset: err.response.headers['x-ratelimit-reset'],
              x_ratelimit_used: err.response.headers['x-ratelimit-used'],
            }
            console.log(rateLimits, 'add commits')
            reject(false)
          }
        });
      } else {
        resolve(true)
      }
    })
  }

  private createCommitIfExists(commitList: GithubCommitFullResponse[], repoId: number) {
    return new Promise<boolean>(async (resolve, reject) => {
      for (const commit of commitList) {
        let existingRecord = await this.prismaService.commit.findUnique({ where: {commit_id: commit.sha}});

        if (!existingRecord) {
          existingRecord = await this.prismaService.commit.create({data: {
            commit_id: commit.sha,
            message: commit.commit.message,
            redirect_url: commit.html_url,
            repo_id: repoId
          }})
        }

        await this.githubService.updateCommitCreationDate(existingRecord)
      }
      resolve(true)

    })
  }

}
