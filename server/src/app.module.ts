import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { PrismaModule } from './prisma/prisma.module';
import { GithubService } from './github/github.service';
import { PrismaService } from './prisma/prisma.service';
import { RepoDBResponse } from './interfaces';


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
    await this.addRepos();
    await this.addCommits()
  }

  addRepos() {
    return new Promise<boolean>((resolve, reject) => {
      this.githubService.getPublicRepositories().subscribe({
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
          console.log('err', err)
          reject(false)
        }
      })
    })
  }

  addCommits() {
    return new Promise<boolean>(async (resolve, reject) => {
      console.log('adding commits')
      const repos: RepoDBResponse[] = await this.prismaService.repository.findMany();
      
      resolve(true)
    })
  }

}
