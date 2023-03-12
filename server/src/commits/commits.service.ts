import { Injectable } from '@nestjs/common';
import { PrismaCommit } from 'src/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommitsService {

    constructor(private prismaService: PrismaService) {}

    fetchAllCommits(repo_id: number): Promise<(PrismaCommit | null)[]> {
        return this.prismaService.commit.findMany({where: {repo_id}})
    }

    filterCommitsByDate(startDate: Date, endDate: Date) {
        return this.prismaService.commit.findMany({
            where: {
                creation: {
                    gt: startDate,
                    lt: endDate,
                }
            }
        }).then(console.log)
    }

}
