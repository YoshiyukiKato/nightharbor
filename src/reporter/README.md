# reporter
A Reporter outputs lighthouse execution result. Use built-in reporters, external reporters, or your custom reporters. Set array of reporters to use as `reporters` in your configuration.

## Use built-in reporter
```js
import {SimpleReporter} from "nightharbor/reporter";
const reporter = new SimpleReporter();

export default {
  ...,
  reporters: [
    new SimpleReporter()
  ],
  ...
}
```

## Use external reporters
- [nightharbor-file-reporter](https://github.com/YoshiyukiKato/nightharbor-file-reporter)
- [nightharbor-s3-reporeter](https://github.com/YoshiyukiKato/nightharbor-s3-reporter)
- [nightharbor-bigquery-reporter](https://github.com/YoshiyukiKato/nightharbor-bigquery-reporter)

## Define custom reporter
Implement `open`, `write`, and `close` method.

```js
class CustomReporter{
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
