import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUrlShortenerDto } from './url-shortener/dto/create-url-shortener.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // recuperer tous les data
  @Get('/data')
  async getData(): Promise<any> {
    console.log('controller ++++');
    return await this.appService.getData();
  }
  //  envoie la data dans le fichier
  @Post('/data')
  public async saveData(
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
  ): Promise<void> {
    await this.appService.saveData();
  }
}
