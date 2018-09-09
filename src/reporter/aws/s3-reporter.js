const Reporter = require("../reporter");

class S3Reporter extends Reporter{
  constructor(s3, bucketName, key){
    super();
    this.s3 = s3;
    this.bucketName = bucketName;
    this.key = key;
    this.body = "";
  }

  close(){
    return this.s3.putObject({
      Bucket: this.bucketName,
      Key: this.key,
      Body: this.body
    }).promise().then();
  }
}

module.exports = S3Reporter;