import {Server} from "http";
import S3rver from 's3rver';

export class S3Local{
  private process?: Server;
  private s3rver: S3rver;

  constructor(s3host, s3port, s3dir){
    this.s3rver = new S3rver({
      hostname: s3host,
      port: s3port,
      directory: s3dir,
      silent: true
    });
  }

  up(){
    return new Promise((resolve, reject) => {
      this.process = this.s3rver.run((err) => {
        if(err){
          reject(err);
        }else{
          resolve(this);
        }
      });
    });
  }

  down(){
    return new Promise((resolve, reject) => {
      if(this.process){
        this.process.close();
        resolve();
      }else{
        reject(new Error("process is not activated"));
      }
    });
  }
}
