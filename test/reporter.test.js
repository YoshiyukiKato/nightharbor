const assert = require("power-assert");
const S3JsonReporter = require("../src/reporter/aws/s3-json-reporter");
const S3CsvReporter = require("../src/reporter/aws/s3-json-reporter");
const BQReporter = require("../src/reporter/gcp/bq-reporter");


describe("reporters", () => {
  describe("AWS S3 reporters", () => {
    it("puts a report file to S3 by json", () => {
      assert(false);
    });

    it("puts a report file to s3 by csv", () => {
      assert(false);
    });
  });
  
  describe("GCP BQ reporters", () => {
    it("sends report data to BQ", () => {
      assert(false);
    });
  });
});