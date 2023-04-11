import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('shortUrl');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
