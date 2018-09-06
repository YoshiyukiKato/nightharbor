const assert = require('power-assert');
const AWS = require('aws-sdk');
const BQ = require("@google-cloud/bigquery");
const fs = require('fs-extra');
const path = require('path');
const S3rver = require('s3rver');
const S3JsonReporter = require('../src/reporter/aws/s3-json-reporter');
const S3CsvReporter = require('../src/reporter/aws/s3-json-reporter');
const BQReporter = require("../src/reporter/gcp/bq-reporter");


describe('reporters', () => {
  describe('AWS S3 reporters', () => {
    var s3rver;
    var s3;
    var s3dir = path.resolve(__dirname, './outputs/s3');
    var bucketName = 'test';
    
    before(() => {
      const s3host = 'localhost';
      const s3port = 4569;

      //refresh directory for s3
      fs.removeSync(s3dir);
      fs.mkdirpSync(s3dir);
      //start local s3
      s3rver = new S3rver({
        port: s3port,
        hostname: s3host,
        silent: false,
        directory: s3dir
      }).run((err) => {});
      //setup for local s3
      AWS.config.update({
        endpoint: `http://${s3host}:${s3port}/${bucketName}`,
        s3BucketEndpoint: true
      });
      s3 = new AWS.S3();
    });

    after(() => {
      //stop local s3
      s3rver.close();
      fs.removeSync(s3dir);
    });
    
    it('puts a report file to S3 by json', () => {
      const reporeter = new S3JsonReporter(s3, bucketName, 'output.json')
    });

    it('puts a report file to s3 by csv', () => {
      const reporter = new S3CsvReporter(s3, bucketName, 'output.csv')
    });
  });
  
  describe('GCP BQ reporters', () => {
    it('sends report data to BQ', () => {
      const bq = new BQ({
        projectId: process.env.GCP_BQ_PROJECT_ID
      });
      const reporeter = new BQReporter(
        bq,
        process.env.GCP_BQ_PROJECT_ID,
        process.env.GCP_BQ_DATASET,
        process.env.GCP_BQ_TABLE
      );
    });
  });
});