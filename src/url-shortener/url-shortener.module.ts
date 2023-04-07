import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortener } from './entities/url-shortener.entity';
import { JwtModule, JwtService } from '@nestjs/jwt/dist';

@Module({
  imports: [UrlShortener],
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService, JwtService],
  exports: [UrlShortenerService],
})
export class UrlShortenerModule {}
