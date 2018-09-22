# nightharbor
[![npm](https://img.shields.io/npm/v/nightharbor.svg)](https://www.npmjs.com/package/nightharbor)
[![CircleCI](https://circleci.com/gh/YoshiyukiKato/nightharbor.svg?style=svg)](https://circleci.com/gh/YoshiyukiKato/nightharbor)
[![sonarcloud badge](https://sonarcloud.io/api/project_badges/measure?project=YoshiyukiKato_nightharbor&metric=alert_status)](https://sonarcloud.io/dashboard?id=YoshiyukiKato_nightharbor)
[![Greenkeeper badge](https://badges.greenkeeper.io/YoshiyukiKato/nightharbor.svg)](https://greenkeeper.io/)

A [lighthouse](https://github.com/GoogleChrome/lighthouse) batch executor providing simple configuration about targeting, execution, and reporting.

## use from cli
```terminal
$ npm i -g nightharbor
```

```terminal
$ nhb --config [path to config]
```

## use from program
```terminal
$ npm i nightharbor
```

```js
import nhb from "nightharbor";
import config from "./path/to/config";

nhb.exec(config)
  .then(() => console.log("done"));
  .catch(console.error);
```

## configuration

```js
export default {
  loaders: [Loader...],
  reporters: [Reporter...],
  batchSize: 2,
  puppeteerConfig: {puppeteerConfig},
  lighthouseConfig: {lighthouseConfig}
}
```

### loaders [required]
Array of `Loader`s. A `Loader` imports a list of targets for lighthouse execution. An item of the target list must contains `url` as follows:

```js
{ url: "https://google.com" }
```

Use built-in loaders, external loaders, and your custom loaders.

#### Use built-in loader
`SimpleLoader` is a built-in loader to specify a target list manually.

```js
import {SimpleLoader} from "nightharbor/loader";

export default {
  //...
  loaders: [
    new SimpleLoader([
      { url: "https://google.com" },
      ...
    ])
  ]
  //...
}
```

#### Use external loaders
- [nightharbor-file-loader](https://github.com/YoshiyukiKato/nightharbor-file-loader)
- [nightharbor-s3-loader](https://github.com/YoshiyukiKato/nightharbor-s3-loader)

#### Define custom reporter
To define custom `Loader`, implement asynchronous `load` method that returns `Promise` of a list of lighthouse targets.

```js
class CustomLoader {
  /**
   * @return {Promise<{ url: string, [key: string]: any }[]>}
   */
  load(){
    //some asynchronous fetch tasks such as read file and api request.
    return Promise.resolve([
      { url: "https://google.com" }
    ]);
  }
}
```

### reporters [required]
Array of `Reporter`s. A `Reporter` writes result of lighthouse execution.
Use built-in reporters, external reporters, or your custom reporters.

#### Use built-in reporter
`SimpleReporter` is a built-in reporter to output result to console.

```js
import {SimpleReporter} from "nightharbor/reporter";

export default {
  ...,
  reporters: [
    new SimpleReporter()
  ],
  ...
}
```

#### Use external reporters
- [nightharbor-file-reporter](https://github.com/YoshiyukiKato/nightharbor-file-reporter)
- [nightharbor-s3-reporeter](https://github.com/YoshiyukiKato/nightharbor-s3-reporter)
- [nightharbor-bigquery-reporter](https://github.com/YoshiyukiKato/nightharbor-bigquery-reporter)

#### Define custom reporter
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

### batchSize [option]
Number of chromes to launch for running lighthouse.  
This parameter is optional. Default value is `1`.

### puppeteerConfig [option]
Object of options to launch chrome via puppeteer. See [launch config of puppeteer](https://github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#puppeteerlaunchoptions)  
This parameter is optional. Default value is follows:

```js
{
  headless: true
}
```

### lighthouseConfig [option]
Object of options to run lighthouse. See [config of LightHouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md)  
This parameter is optional. Default value is follows:

```js
{
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance'],
  }
}
```