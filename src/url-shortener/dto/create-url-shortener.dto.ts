import { Matches } from 'class-validator';

export class CreateUrlShortenerDto {
  //?! exclut =>
  // 1- (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost|\[::1\])(:\d+)?|(.*\.)? => adresse IP, localhost, adresse IPv6 avec un numéro de port différent des ports classiques
  //2- (.*\.)?mon-domaine\.com(:\d+)? => domaine ou sous-domaine incluant "mon-domaine.com"
  //3- .*\.local(:\d+)?) => une adresse en local
  //4- (.*:)? => match la partie protocol de l'URL
  //5- (80|443)? => match le numéro de port

  @Matches(
    /^(?!(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost|\[::1\])(:\d+)?|(.*\.)?(mon-domaine\.com|local)(:\d+)?)(.*:)?(80|443)?$/,
    {
      message: "*Il n'est pas possible d'utiliser ce type d'URL",
    },
  )
  url: string;
}
