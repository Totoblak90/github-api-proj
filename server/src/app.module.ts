import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    GithubModule, ConfigModule.forRoot({
      isGlobal: true
    }), 
    PrismaModule
  ],
})
export class AppModule {}
