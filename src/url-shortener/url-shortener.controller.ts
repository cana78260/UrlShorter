import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import { Response } from 'express';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  create(@Body() createUrlShortenerDto: CreateUrlShortenerDto) {
    return this.urlShortenerService.create(createUrlShortenerDto);
  }

  @Get('/data')
  async getFile(): Promise<any> {
    console.log('controller ++++');
    return await this.urlShortenerService.getFile();
  }

  @Post('/data')
  public async saveUrlData(
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    console.log('**************createUrlShortenerDto', createUrlShortenerDto);
    await this.urlShortenerService.saveUrlData(createUrlShortenerDto, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlShortenerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUrlShortenerDto: UpdateUrlShortenerDto,
  ) {
    return this.urlShortenerService.update(+id, updateUrlShortenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlShortenerService.remove(+id);
  }
}
