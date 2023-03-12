import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, filter, tap, catchError, take } from 'rxjs/operators';
import * as flatted from 'flatted';
import { GithubFullResponse, PrismaCommit, Repo, RepoDBResponse } from 'src/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class GithubService {

    constructor(private httpService: HttpService, private prismaService: PrismaService) {}

    getPublicRepositories(): Observable<Repo[]> {
        return this.httpService.get(`https://api.github.com/users/Totoblak90/repos`, {
            params: {
                visibility: 'public',
              },
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer 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`
            },
        }).pipe(
            map(response => flatted.parse(flatted.stringify(response.data)) as GithubFullResponse[]),
            map((response: GithubFullResponse[]) => response.map((repo) => {
                return {
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    route: repo.full_name,
                    user_name: repo.owner.login
                }
            }))
        );
    }


    getCommitHistory(repoName: string): Observable<any> {
        return this.httpService.get(`https://api.github.com/repos/Totoblak90/${repoName}/commits`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer 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`
            },
        })
        .pipe(
            map((response: any) => flatted.parse(flatted.stringify(response.data))),
        )
    }

    async updateCommitCreationDate(commit: PrismaCommit) {
        try {
            const { repo_id, commit_id } = commit;
    
            const repository: RepoDBResponse | null = await this.prismaService.repository.findUnique({where: {repo_id}})
    
            if (repository) {
                this.httpService.get(`https://api.github.com/repos/Totoblak90/${repository.name}/commits/${commit_id}`, {
                        headers: {
                            Accept: 'application/vnd.github.v3+json',
                            Authorization: `Bearer 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`
                        },
                    })
                    .pipe(
                        take(1),
                        map((response: any) => flatted.parse(flatted.stringify(response.data))),
                        map(response => new Date(response.commit.author.date))
                    )
                    .subscribe({
                        next: async (creationDate) => {
                            const update = await this.prismaService.commit.update({
                                where: { commit_id },
                                data: { creation: creationDate }
                            })
                        },
                        error: (err) => {
                            const rateLimits: {[key: string]: any} = {
                                x_ratelimit_limit: err.response.headers['x-ratelimit-limit'],
                                x_ratelimit_remaining: err.response.headers['x-ratelimit-remaining'],
                                x_ratelimit_reset: err.response.headers['x-ratelimit-reset'],
                                x_ratelimit_used: err.response.headers['x-ratelimit-used'],
                              }
                              console.log(rateLimits, 'updateCommitCreationDate')
                        }
                    })
            }
            
        } catch (error) {
            console.log(error, 'updateCommitCreationDate')
        }
    }


}