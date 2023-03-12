import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommitsService } from './commits.service';

@Controller({
    path: 'api/commits'
})
export class CommitsController {

    constructor(private commitsService: CommitsService) {}

    @Get('/search')
    async filterCommitsByDate(@Query('start_date') startDate: Date, @Query('end_date') endDate: Date, @Query('repo_id') repo_id: string) {
        return await this.commitsService.filterCommitsByDate(startDate, endDate, repo_id);
    }

    @Get()
    async fetchFullCommitList(@Query('repo_id') repo_id: string) {
        return await this.commitsService.fetchAllCommits(Number(repo_id))
    }

}
