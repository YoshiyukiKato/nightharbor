# reporter
Reporter is module that outputs lighthouse execution result. Use built-in reporters, or define your custom reporters.  
Set array of reporters to use as `reporters` in your configuration as follows:

```js
//your.config.js
const JsonReporter = require("lighthouse-keeper/reporter/local/json-reporter");
const CustomReporter = require("/path/to/custom-reporter");
const jsonReporter = new JsonReporter("/path/to/output.json");
const customReporter = new CustomReporter(/* some args */);

module.exports = {
  //other configurations
  ...
  reporters: [
    jsonReporter,
    customReporter
  ]
}
```

## Use built-in reporters
### Local file
#### report by json
```js
const JsonReporter = require("lighthouse-keeper/reporter/local/json-reporter");
const reporter = new JsonReporter("/path/to/output.json");
```

#### report by csv
```js
const CsvReporter = require("lighthouse-keeper/reporter/local/csv-reporter");
const reporter = new CsvReporter("/path/to/output.csv");
```

### AWS S3

```sh
$ npm install --save aws-sdk
```

#### report by json

```js
const S3JsonReporter = require("lighthouse-keeper/reporter/aws/s3-json-reporter");
const AWS = require("aws-sdk");
AWS.config.update({/** your configuration */});
const s3 = new AWS.S3();
const reporter = new S3JsonReporter(s3, "bucket name", "/path/to/output.csv");
```

#### report by csv

```js
const S3CsvReporter = require("lighthouse-keeper/reporter/aws/s3-csv-reporter");
const AWS = require("aws-sdk");
AWS.config.update({/** your configuration */});
const s3 = new AWS.S3();
const reporter = new S3CsvReporter(s3, "bucket name", "/path/to/output.csv");
```

### GCP BigQuery
```sh
$ npm install --save @google-cloud/bigquery
```

```js
const BQReporter = require("lighthouse-keeper/reporter/gcp/bq-reporter");
const BQ = require("@google-cloud/bigquery");
const bq = new BQ({
  projectId: "gcp project id"
});
const reporter = new BQReporter(bq, "dataset name", "table name");
```

## Define custom reporter
Please implement `open`, `write`, and `close` method.

```js
class CustomReporter{
  /**
   * will be called before all executions
   * @return {void}
   */
  open(){
    //do something
  }

  /**
   * will be called when a lighthouse execution completed
   * @param {any} result
   * @return {void}
   */
  write(result){
    //do something
  }

  /**
   * will be called after all executions
   * @return {Promise}
   */
  close(){
    //do something
  }
}
```
