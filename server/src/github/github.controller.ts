import { Controller, Get } from "@nestjs/common";
import { GithubService } from './github.service';

@Controller({
    path: 'api'
})
export class GithubController {
    constructor(private githubService: GithubService) {}

    @Get('repos')
    allRepos() {
        return this.githubService.getPublicRepositories()
    }
}