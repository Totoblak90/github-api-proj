import { Controller, Get, Query } from '@nestjs/common';
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

    @Get('/search')
    async filterCommitsByDate(@Query('term') term: string) {
        return await this.repositoriesService.filterRepos(term);
    }
}
