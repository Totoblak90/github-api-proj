import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';


@Module({
  imports: [GithubModule, ConfigModule.forRoot({
    isGlobal: true
  })],
})
export class AppModule {}
