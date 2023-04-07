import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    UrlShortenerModule,
    JwtModule.register({ secret: process.env.SECRET_KEY }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
