import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as flatted from 'flatted';
import { GithubFullResponse, Repo } from 'src/interfaces';

@Injectable({})
export class GithubService {

    constructor(private httpService: HttpService, private confiService: ConfigService) {}

    getPublicRepositories(): Observable<Repo[]> {
        return this.httpService.get(`https://api.github.com/users/Totoblak90/repos`, {
            params: {
                visibility: 'public',
              },
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: this.confiService.get('GITHUB_ACCES_TOKEN')
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


}