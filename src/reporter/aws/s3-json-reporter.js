const S3Reporter = require("./s3-reporter");

class S3JsonReporter extends S3Reporter{
  constructor(s3, bucketName, key){
    super(s3, bucketName, key);
    this.bodyData = { results: [] };
  }

  write(result){
    this.bodyData.results.push(result);
  }

  close(){
    this.body = JSON.stringify(this.bodyData);
    super.close();
  }
}

module.exports = S3JsonReporter;