import { Injectable } from '@nestjs/common';
import { PrismaCommit } from 'src/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommitsService {

    constructor(private prismaService: PrismaService) {}

    fetchAllCommits(repo_id: number): Promise<(PrismaCommit | null)[]> {
        return this.prismaService.commit.findMany({where: {repo_id}})
    }

    filterCommitsByDate(startDate: Date, endDate: Date, repo_id: string) {
        return this.prismaService.commit.findMany({
            where: {
                creation: {
                    gte: startDate,
                    lte: endDate,
                },
                repo_id: {
                    equals: Number(repo_id)
                }
            }
        })
    }

}
