import { Controller, Get } from '@nestjs/common';
import { RepoDBResponse } from 'src/interfaces';
import { RepositoriesService } from './repositories.service';

@Controller({
    path: 'api/repositories'
})
export class RepositoriesController {

    constructor(private repositoriesService: RepositoriesService) {}

    @Get()
    async repoList() {
        try {
            return await this.repositoriesService.fetchRepos() as RepoDBResponse[];
        } catch (error) {
            return error;
        }
    }
}
