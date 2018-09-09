const S3rver = require('s3rver');

class S3Local{
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
      this.process.close();
      resolve();
    });
  }
}

module.exports = S3Local;