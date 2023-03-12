import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommitsService } from './commits.service';

@Controller({
    path: 'api/commits'
})
export class CommitsController {

    constructor(private commitsService: CommitsService) {}

    @Get()
    async fetchFullCommitList(@Query('repo_id') repo_id: string) {
        return await this.commitsService.fetchAllCommits(Number(repo_id))
    }
}
