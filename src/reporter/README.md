# reporter
A Reporter outputs lighthouse execution result. Use built-in reporters, external reporters, or your custom reporters. Set array of reporters to use as `reporters` in your configuration as follows:

```js
//your.config.js
import {JsonReporter} from "nightharbor/reporter";
import ExternalReporter from "[external reporter package]";
import CustomReporter from "/path/to/custom-reporter";

export default {
  //other configurations
  ...
  reporters: [
    new JsonReporter("/path/to/output.json"),
    new ExternalReporter(/* some args */),
    new CustomReporter(/* some args */)
  ]
}
```

## Use built-in reporters
```js
import {CsvReporter, JsonReporter} from "nightharbor/reporter";
const reporter = new JsonReporter("/path/to/output.json");

export default {
  ...,
  reporters: [
    new CsvReporter("/path/to/output.csv"),
    new JsonReporter("/path/to/output.json")
  ],
  ...
}
```

## Use external reporters
- [nightharbor-s3-reporeter](https://github.com/YoshiyukiKato/nightharbor-s3-reporter)
- [nightharbor-bigquery-reporter](https://github.com/YoshiyukiKato/nightharbor-bigquery-reporter)

## Define custom reporter
Implement `open`, `write`, and `close` method.

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
