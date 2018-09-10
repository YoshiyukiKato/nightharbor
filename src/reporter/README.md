# reporter
A Reporter outputs lighthouse execution result. Use built-in reporters, or define your custom reporters.  
Set array of reporters to use as `reporters` in your configuration as follows:

```js
//your.config.js
import {JsonReporter} from "nightharbor/reporter/local";
import CustomReporter from "/path/to/custom-reporter";

export default {
  //other configurations
  ...
  reporters: [
    new JsonReporter("/path/to/output.json"),
    new CustomReporter(/* some args */)
  ]
}
```

## Use built-in reporters
### Local file
#### report by json
```js
import {JsonReporter} from "nightharbor/reporter/local";
const reporter = new JsonReporter("/path/to/output.json");
```

#### report by csv
```js
import {CsvReporter} from "nightharbor/reporter/local";
const reporter = new CsvReporter("/path/to/output.csv");
```

### AWS S3

```sh
$ npm install --save aws-sdk
```

#### report by json

```js
import {S3JsonReporter} from "nightharbor/reporter/aws";
import AWS from "aws-sdk";
AWS.config.update({/** your configuration */});
const s3 = new AWS.S3();
const reporter = new S3JsonReporter(s3, "bucket name", "/path/to/output.csv");
```

#### report by csv

```js
import {S3CsvReporter} from "nightharbor/reporter/aws";
import AWS from "aws-sdk";
AWS.config.update({/** your configuration */});
const s3 = new AWS.S3();
const reporter = new S3CsvReporter(s3, "bucket name", "/path/to/output.csv");
```

### GCP BigQuery
```sh
$ npm install --save @google-cloud/bigquery
```

```js
import {BqReporter} from "nightharbor/reporter/gcp";
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
