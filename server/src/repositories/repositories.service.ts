import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RepositoriesService {

    constructor(private prismaService: PrismaService) {}

    fetchRepos() {
        return this.prismaService.repository.findMany()
    }

}
