import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { PrismaModule } from './prisma/prisma.module';
import { GithubService } from './github/github.service';
import { PrismaService } from './prisma/prisma.service';
import { RepoDBResponse, GithubCommitFullResponse } from './interfaces';
import { take } from 'rxjs/operators';


@Module({
  imports: [
    GithubModule, ConfigModule.forRoot({
      isGlobal: true
    }), 
    PrismaModule
  ],
})
export class AppModule implements OnApplicationBootstrap {

  constructor(private githubService: GithubService, private prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    console.log(JSON.stringify({
      sha: 'b98f28077ae215103546293c79f182e809dd87c8',
      node_id: 'MDY6Q29tbWl0NDc3NTI2NjczOmI5OGYyODA3N2FlMjE1MTAzNTQ2MjkzYzc5ZjE4MmU4MDlkZDg3Yzg=',
      commit: {
        author: [Object],
        committer: [Object],
        message: 'Delete .DS_Store',
        tree: [Object],
        url: 'https://api.github.com/repos/Totoblak90/rxjs/git/commits/b98f28077ae215103546293c79f182e809dd87c8',
        comment_count: 0,
        verification: [Object]
      },
      url: 'https://api.github.com/repos/Totoblak90/rxjs/commits/b98f28077ae215103546293c79f182e809dd87c8',
      html_url: 'https://github.com/Totoblak90/rxjs/commit/b98f28077ae215103546293c79f182e809dd87c8',
      comments_url: 'https://api.github.com/repos/Totoblak90/rxjs/commits/b98f28077ae215103546293c79f182e809dd87c8/comments',
      author: {
        login: 'Klerith',
        id: 3438503,
        node_id: 'MDQ6VXNlcjM0Mzg1MDM=',
        avatar_url: 'https://avatars.githubusercontent.com/u/3438503?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/Klerith',
        html_url: 'https://github.com/Klerith',
        followers_url: 'https://api.github.com/users/Klerith/followers',
        following_url: 'https://api.github.com/users/Klerith/following{/other_user}',
        gists_url: 'https://api.github.com/users/Klerith/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/Klerith/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/Klerith/subscriptions',
        organizations_url: 'https://api.github.com/users/Klerith/orgs',
        repos_url: 'https://api.github.com/users/Klerith/repos',
        events_url: 'https://api.github.com/users/Klerith/events{/privacy}',
        received_events_url: 'https://api.github.com/users/Klerith/received_events',
        type: 'User',
        site_admin: false
      },
      committer: {
        login: 'web-flow',
        id: 19864447,
        node_id: 'MDQ6VXNlcjE5ODY0NDQ3',
        avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/web-flow',
        html_url: 'https://github.com/web-flow',
        followers_url: 'https://api.github.com/users/web-flow/followers',
        following_url: 'https://api.github.com/users/web-flow/following{/other_user}',
        gists_url: 'https://api.github.com/users/web-flow/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/web-flow/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/web-flow/subscriptions',
        organizations_url: 'https://api.github.com/users/web-flow/orgs',
        repos_url: 'https://api.github.com/users/web-flow/repos',
        events_url: 'https://api.github.com/users/web-flow/events{/privacy}',
        received_events_url: 'https://api.github.com/users/web-flow/received_events',
        type: 'User',
        site_admin: false
      },
      parents: [ [Object] ]
    }))
    // await this.addRepos();
    // await this.addCommits();
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
        next: async (res: GithubCommitFullResponse) => {
          
          if (index < repos.length) {
            await this.addCommits(index + 1);
          } 
          resolve(true);  
        },
        error: (err) => {
          console.log(err.response)
          // const rateLimits: {[key: string]: any} = {
          //   x_ratelimit_limit: err.response.headers['x-ratelimit-limit'],
          //   x_ratelimit_remaining: err.response.headers['x-ratelimit-remaining'],
          //   x_ratelimit_reset: err.response.headers['x-ratelimit-reset'],
          //   x_ratelimit_used: err.response.headers['x-ratelimit-used'],
          // }
          // console.log(rateLimits, 'add commits')
          reject(false)
        }
      });
    })
  }

}
