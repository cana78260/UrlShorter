import { Injectable } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UpdateUrlShortenerDto } from './dto/update-url-shortener.dto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Url } from 'url';
import { url } from 'inspector';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt/dist';
import { Response } from 'express';

@Injectable()
export class UrlShortenerService {
  constructor(private jwtService: JwtService) {}
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

  public async saveUrlData(
    createUrlShortenerDto: CreateUrlShortenerDto,
    res: Response,
  ): Promise<void> {
    const fileContent: any = await new Promise((resolve, reject) => {
      fs.readFile('data.json', 'utf-8', function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
        console.log('readFileData', data);
      });
    });

    // const fileContent = fs.readFile('data.json', 'utf-8');
    console.log(fileContent);
    const data = JSON.parse(fileContent);
    console.log('data après le parse', data);

    const idvalue = uuidv4();
    console.log('valueID', idvalue);
    // console.log('id', id);

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // create(@Body() body: { url: string }) {
    //   const link = this.linksService.createLink(body.url);
    //   return {
    //     id: link.id,
    //     shortUrl: link.shortUrl,
    //     removalToken: link.removalToken,
    //   };

    const originalUrl = createUrlShortenerDto;
    console.log('originalUrl----------------------------------', originalUrl);
    const shortUrlToString = `https://mon-domaine.com/${idvalue}`;
    console.log(
      'shortUrlToString<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      shortUrlToString,
    );

    const payload = {
      tokenId: idvalue,
    };
    console.log('payload', payload);
    const options = { secret: process.env.SECRET_KEY };
    const tokenDelete = this.jwtService.sign(payload, options);
    console.log(tokenDelete);

    // const removalToken = this.jwtService.sign(payload)
    // let shortUrl;
    // if (shortUrl) {
    //   shortUrl = url.parse(shortUrlToString);
    // }

    // Chemin du fichier JSON contenant les URLs raccourcies
    // const filePath = './data.json';

    // Génération d'un token aléatoire
    // const generateToken = () => {
    //   return crypto.randomBytes(20).toString('hex');
    // };

    // Création d'une nouvelle URL raccourcie avec un token
    // const createShortUrl = (originalUrl) => {
    //   // Génération du token
    //   const token = generateToken();
    //   console.log('token++++++++++++++++++++', token);
    //   // Chargement des URLs raccourcies existantes depuis le fichier JSON
    //   const urls = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    //   // Ajout de la nouvelle URL raccourcie avec le token
    //   urls[token] = { originalUrl: originalUrl };

    //   // Enregistrement de l'objet URLs dans le fichier JSON
    //   fs.writeFileSync(filePath, JSON.stringify(urls));

    //   return `https://mon-domaine.com/${token}`;
    // };

    // const shortUrl = createShortUrl;

    //------------------------------------------------
    data[idvalue] = {
      idvalue,
      originalUrl,
      shortUrlToString,
      tokenDelete,
    };
    // );
    //----------------------------------------------------------
    const mimeType = 'application/json';
    const location = shortUrlToString;
    const removalToken = tokenDelete;

    //-----------------------------------------------------------
    console.log('data après le push', data);
    await fs.promises.writeFile('data.json', JSON.stringify(data), {
      encoding: 'utf-8',
    });
    // res.headers.set('Content-Type: ', mimeType);
    // res.set({ 'Content-Type': 'Content-Type: ', Value: mimeType });
    // res.set()('X-Removal-Token: ', removalToken);
    res.set({
      'Content-Type': mimeType,
      location: shortUrlToString,
      'X-Removal-Token': removalToken,
    });
    res.send({ status: 'ok' });
  }
  // res.set({
  //   Headers: {
  //     'Content-Type': 'image/png',
  //   },
  // });

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
