import { Injectable } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import * as fs from 'fs';

@Injectable()
export class UrlShortenerService {
  private readonly filename = 'data.json';
  create(createUrlShortenerDto: CreateUrlShortenerDto) {
    return 'This action adds a new urlShortener';
  }

  public async getFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filename, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async saveUrlData(): Promise<void> {
    const fileContent = fs.readFileSync('data.json', 'utf-8');
    console.log(fileContent);
    const data = JSON.parse(fileContent);
    console.log('data après le parse', data);
    data.utilisateur4 = {
      name: 'John Duck',
      age: 0,
      hobbies: ['reading', 'coding', 'gaming', 'sleeping'],
    };

    console.log('data après le push', data);
    await fs.promises.writeFile('data.json', JSON.stringify(data));
  }

  findAll() {
    return `This action returns all urlShortener`;
  }

  findOne(id: number) {
    return `This action returns a #${id} urlShortener`;
  }

  update(id: number, updateUrlShortenerDto: UpdateUrlShortenerDto) {
    return `This action updates a #${id} urlShortener`;
  }

  remove(id: number) {
    return `This action removes a #${id} urlShortener`;
  }
}
