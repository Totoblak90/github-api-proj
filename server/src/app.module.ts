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
    const repos: RepoDBResponse[] = await this.prismaService.repository.findMany();
    const commits: PrismaCommit[] = await this.prismaService.commit.findMany();

    if (!repos.length) {
      await this.addRepos();
    }

    if (!commits.length) {
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

  // I created a recursive function to increase the time between requests to the Github API due to the ratelimit issue.
  addCommits(index = 0) {
    return new Promise<boolean>(async (resolve, reject) => {
      const repos: RepoDBResponse[] = await this.prismaService.repository.findMany();

      this.githubService.getCommitHistory(repos[index].name).pipe(take(1)).subscribe({
        next: async (commitList: GithubCommitFullResponse[]) => {
          await this.addCommitToDb(commitList, repos[index].repo_id)

          if (index < repos.length) {
            await this.addCommits(index + 1);
          } 
          resolve(true);  
        },
        error: (err) => {
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
    })
  }

  private addCommitToDb(commitList: GithubCommitFullResponse[], repoId: number) {
    return new Promise<boolean>(async (resolve, reject) => {
      for (const commit of commitList) {
        const existingRecord = await this.prismaService.commit.findUnique({ where: {commit_id: commit.sha}})
        if (!existingRecord) {
          await this.prismaService.commit.create({data: {
            commit_id: commit.sha,
            message: commit.commit.message,
            redirect_url: commit.html_url,
            repo_id: repoId
          }})
        }
      }
    })
  }

}
