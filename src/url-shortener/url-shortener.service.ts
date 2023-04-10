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
    //Lecture du fichier json
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

    console.log(fileContent);
    //On parse le fichier en objet java script
    const data = JSON.parse(fileContent);
    console.log('data après le parse', data);

    //On génère un UUID
    const idvalue = uuidv4();
    console.log('valueID', idvalue);

    //On récupère l'URL originale dans une variable
    const originalUrl = createUrlShortenerDto;
    console.log('originalUrl----------------------------------', originalUrl);

    //Création de l'URL raccourcie avec un ID unique
    const shortUrlToString = `https://mon-domaine.com/${idvalue}`;
    console.log(
      'shortUrlToString<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      shortUrlToString,
    );

    //Génération d'un token avec l'ID dans le payload
    const payload = {
      tokenId: idvalue,
    };
    console.log('payload', payload);
    const options = { secret: process.env.SECRET_KEY };
    const tokenDelete = this.jwtService.sign(payload, options);
    console.log(tokenDelete);

    //Création d'une propriété supplémentaire dans un objet
    data[idvalue] = {
      idvalue,
      originalUrl,
      shortUrlToString,
      tokenDelete,
    };
    // );
    //----------------------------------------------------------
    const mimeType = 'application/json';

    //-----------------------------------------------------------
    console.log('data après le push', data);

    //écrasement du fichier avec les données d'origine et les données supplémentaires
    await fs.promises.writeFile('data.json', JSON.stringify(data), {
      encoding: 'utf-8',
    });

    //Génération de la réponse
    res.set({
      'Content-Type': mimeType,
      location: shortUrlToString,
      'X-Removal-Token': tokenDelete,
    });
    res.send({ status: 'ok' });
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
