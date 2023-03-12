import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommitsService {

    constructor(private prismaService: PrismaService) {}

    fetchAllCommits(repo_id: number) {
        return this.prismaService.commit.findMany({where: {repo_id}})
    }

}
