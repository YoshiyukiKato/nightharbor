# perf-collector
A wrapper tool of [lighthouse](https://github.com/GoogleChrome/lighthouse) to collect multiple web-site performance data.

## use from cli
```terminal
$ npm i -g perf-collector
```

```terminal
$ perf --config [path to config]
```

## use from program
```terminal
$ npm i perf-collector
```

```js
const perfCollector = require("perf-collector");
const config = require("./path/to/config");

perfCollector.exec(config)
  .then((context) => {
    console.log(context.getResults());
  })
  .catch((err) => {
    console.error(err);
  });
```

## configuration

```js
{
  targets: [{ url: "https://target.site" }...],
  reporters: [Reporter...],
  chromeNum: 2,
  chromeConfig: {chromeConfig},
  lighthouseConfig: {lighthouseConfig}
}
```

### targets [required]
Array of target to perform audits by lighthouse. 
The target object must contains `url` property as follows:

```js
{ url: "https://google.com" }
```

### reporters [required]
Array of Reporter instance.

### chromeNum [option]
Number of chromes to launch for running lighthouse.  
This parameter is optional. Default value is `1`;

### chromeConfig [option]
Object of options to launch chrome. See [config of Chrome Launcher](https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md)  
This parameter is optional. Default value is follows:

```js
{
  chromeFlags: [
    "--headless"
  ]
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