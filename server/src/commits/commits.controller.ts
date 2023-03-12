import { Controller, Get, Param } from '@nestjs/common';
import { CommitsService } from './commits.service';

@Controller({
    path: 'api/commits'
})
export class CommitsController {

    constructor(private commitsService: CommitsService) {}

    @Get(':repo_id')
    async fetchFullCommitList(@Param('repo_id') repo_id: string) {
        const parsedRepoId = Number(repo_id.split('=')[1])
        console.log(await this.commitsService.fetchAllCommits(parsedRepoId))
        
        return await this.commitsService.fetchAllCommits(parsedRepoId)
    }
}
