# nightharbor
[![npm](https://img.shields.io/npm/v/nightharbor.svg)](https://www.npmjs.com/package/nightharbor)
[![CircleCI](https://circleci.com/gh/YoshiyukiKato/nightharbor.svg?style=shield)](https://circleci.com/gh/YoshiyukiKato/nightharbor)
[![codecov](https://codecov.io/gh/YoshiyukiKato/nightharbor/branch/master/graph/badge.svg)](https://codecov.io/gh/YoshiyukiKato/nightharbor)
[![codebeat badge](https://codebeat.co/badges/a8364cd6-325b-43db-a74a-1fe26add195f)](https://codebeat.co/projects/github-com-yoshiyukikato-nightharbor-master)
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
  targetLoaders: [TargetLoader...],
  reporters: [Reporter...],
  chromeNum: 2,
  puppeteerConfig: {puppeteerConfig},
  lighthouseConfig: {lighthouseConfig}
}
```

### targetLoaders [required]
Array of TargetLoader instances. A TargetLoader fetches a list of target items containing `url` property as follows:

```js
{ url: "https://google.com" }
```

Use a built-in TargetLoader or define a custom TargetLoader. `SimpleTargetLoader` is a built-in one, enables you to specify a target list manually.

```js
import {SimpleTargetLoader} from "nightharbor/target-loader";

export default {
  //...
  targetLoaders: [
    new SimpleTargetLoader([
      { url: "https://google.com" },
      ...
    ])
  ]
  //...
}
```

To define custom TargetLoader, implement asynchronous `load` method that returns `Promise` of a list of lighthouse targets.

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
Array of Reporter instances. A Reporter writes result of lighthouse execution data.
In detial, please checkout [`./src/reporter`]()

```js
import {JsonReporter} from "nightharbor/reporter/local";

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