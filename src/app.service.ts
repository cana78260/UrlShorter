import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import * as fs from 'fs';
import { json } from 'stream/consumers';

@Injectable()
export class AppService {
  private readonly filename = 'data.json';

  getHello(): string {
    return 'Hello World!';
  }
  public async getData(): Promise<any> {
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

  public async saveData(): Promise<void> {
    const fileContent = fs.readFileSync('data.json', 'utf-8');
    console.log(fileContent);
    const data = JSON.parse(fileContent);
    console.log('data après le parse', data);
    data.utilisateur3 = {
      name: 'John donald Duck',
      age: 40000,
      hobbies: ['reading', 'coding', 'gaming'],
    };

    console.log('data après le push', data);
    await fs.promises.writeFile('data.json', JSON.stringify(data));
    // await new Promise((resolve, reject) => {
    //   fs.readFile(this.filename, 'utf-8', function (err, data) {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(data);
    //     }
    //     console.log('readFileData', data);
    //   });
    // });

    // const parseData = JSON.parse(data);
    // console.log('parseData', parseData);

    // if (!data.liste) {
    //   data.liste = data;
    // }
    // console.log('data.liste', data.liste);
    // await data.liste.push(testWrite);
    // console.log('parseData après le push', data.liste);

    // const jsonString = JSON.stringify(data);
    // console.log('readFileData', jsonString);
    // console.log('jsonString', jsonString);

    // await new Promise((resolve, reject) => {
    //   fs.writeFile(this.filename, jsonString, function (err) {
    //     if (err) {
    //       reject(err);
    //     }
    //     console.log('jsonString', jsonString);
    //     return "tout s'est bien passé";
    //   });
    // });
    // return new Promise<void>((resolve, reject) => {
    //   fs.writeFile(this.filename, JSON.stringify(data), 'utf-8', (err) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve();
    //     }
    //   });
    // });
  }
}
