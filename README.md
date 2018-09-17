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
{
  loaders: [Loader...],
  reporters: [Reporter...],
  chromeNum: 2,
  puppeteerConfig: {puppeteerConfig},
  lighthouseConfig: {lighthouseConfig}
}
```

### loaders [required]
Array of `Loader`s. A `Loader` fetches a list of target items containing `url` property as follows:

```js
{ url: "https://google.com" }
```

Use a built-in `Loader` or define a custom `Loader`. `SimpleLoader` is a built-in one, enables you to specify a target list manually.

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

To define custom `Loader`, implement asynchronous `load` method that returns `Promise` of a list of lighthouse targets.

```js
class CustomLoader {
  /**
   * @return {Promise<{ url: string }[]>}
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
In detial, please checkout [`./src/reporter`](https://github.com/YoshiyukiKato/nightharbor/tree/master/src/reporter)

```js
import {JsonReporter} from "nightharbor/reporter";

export default {
  ...,
  reporters: [
    new JsonReporter("path/to/output.json")
  ],
  ...
}
```

### chromeNum [option]
Number of chromes to launch for running lighthouse.  
This parameter is optional. Default value is `1`;

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