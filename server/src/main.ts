import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const corsOptions: CorsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.enableCors(corsOptions);

  // Server
  await app.listen(3000);
}
bootstrap();
