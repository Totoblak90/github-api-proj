import { Injectable } from '@nestjs/common';
import { RepoDBResponse } from 'src/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RepositoriesService {

    constructor(private prismaService: PrismaService) {}

    fetchRepos(): Promise<(RepoDBResponse | null)[]> {
        return this.prismaService.repository.findMany()
    }

}
