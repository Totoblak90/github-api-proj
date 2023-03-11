import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private confiService: ConfigService) {
        super({ datasources: { db: { url: confiService.get('DATABASE_URL') } } })
    }

}
