const assert = require("power-assert");
const AWS = require("AWS");
const S3JsonReporter = require("../src/reporter/aws/s3-json-reporter");
const S3CsvReporter = require("../src/reporter/aws/s3-json-reporter");
const {collectPerf} = require("../src/core");

describe("reporters", () => {
  describe("AWS S3 reporters", () => {
    let s3;
    let bucketName = "test";
    let targets = [{ url : "https://google.com" }];
    
    before(() => {
      //setup local s3
      AWS.config.update({
        endpoint: `http://localhost:4569/${bucketName}`,
        s3BucketEndpoint: true
      });
      s3 = new AWS.S3();
    });
    
    it("puts a report file to S3 by json", () => {
      return collectPerf({
        targets: targets,
        reporters: [
          new S3JsonReporter(s3, bucketName, "output.json")
        ]
      }).then(() => {
          //check if file exists
          assert(false);
        });
    });

    it("puts a report file to s3 by csv", () => {
      return collectPerf({
        targets: targets,
        reporters: [
          new S3CsvReporter(s3, bucketName, "output.csv")
        ]
      }).then(() => {
          //check if file exists
          assert(false);
        });
    });
  });
  
  describe("GCP BQ reporters", () => {
    it("sends report data to BQ", () => {
      assert(false);
    });
  });
});