const assert = require('power-assert');
const AWS = require('aws-sdk');
const BQ = require("@google-cloud/bigquery");
const csv=require('csvtojson');
const fs = require('fs-extra');
const path = require('path');
const S3Local = require("./fixture/s3-local");
const {S3JsonReporter,S3CsvReporter} = require('../dist/reporter/aws');
const {BqReporter} = require("../dist/reporter/gcp");


describe('reporters', () => {
  describe('AWS S3 reporters', () => {
    const s3host = 'localhost';
    const s3port = 4569;
    const s3dir = path.resolve(__dirname, './outputs/s3');
    const s3Local = new S3Local(s3host, s3port, s3dir);
    const bucketName = 'test';
    AWS.config.update({
      endpoint: `http://${s3host}:${s3port}/${bucketName}`,
      s3BucketEndpoint: true,
      credentials: new AWS.Credentials({ 
        accessKeyId: "",
        secretAccessKey: ""
      })
    });
    const s3 = new AWS.S3();

    before(() => {
      //refresh directory for s3
      fs.removeSync(s3dir);
      fs.mkdirpSync(s3dir);
      //start local s3
      return s3Local.up()
        .then(() => {
          return s3.createBucket({ Bucket: bucketName }).promise();
        });
    });

    after(() => {
      //teardown local s3
      return s3Local.down()
        .then(() => {
          fs.removeSync(s3dir);
        });
    });
    
    it('puts a report file to S3 by json', () => {
      const key = 'output.json'
      const reporter = new S3JsonReporter(s3, bucketName, key);
      const data = { message: "test" };
      const expected = { results: [data] };
      reporter.open();
      reporter.write(data);
      return reporter.close()
        .then(() => {
          return s3.getObject({ Bucket: bucketName, Key: key }).promise();
        })
        .then((result) => {
          assert.deepEqual(expected, JSON.parse(result.Body.toString()));
        });
    });

    it('puts a report file to s3 by csv', () => {
      const key = 'output.csv'
      const reporter = new S3CsvReporter(s3, bucketName, key);
      const data = { message: "test" };
      const expected = [data];
      reporter.open();
      reporter.write(data);
      return reporter.close()
        .then(() => {
          return s3.getObject({ Bucket: bucketName, Key: key }).promise();
        })
        .then((result) => {
          return csv().fromString(result.Body.toString());
        })
        .then((result) => {
          assert.deepEqual(expected, result);
        });
    });
  });
  
  describe('GCP BQ reporters', () => {
    var bq = new BQ({
      projectId: process.env.GCP_PROJECT_ID
    });
    var dataset = process.env.GCP_BQ_DATASET;
    var table = process.env.GCP_BQ_TABLE;

    before(() => {
      return bq.dataset(dataset).createTable(table, { schema: "message:string" });
    });
    
    it('sends report data to BQ with no error', () => {
      const data = { message: "test" };
      const reporter = new BqReporter(bq, dataset, table);
      reporter.open();
      reporter.write(data);
      return reporter.close()
        .then(() => {
          assert(true);
        });
    });

    after(() => {
      return bq.dataset(dataset).table(table).delete();
    });
  });
});