# lighthouse-keeper
A wrapper tool of [lighthouse](https://github.com/GoogleChrome/lighthouse) to collect multiple web-site performance data.

## use from cli
```terminal
$ npm i -g lighthouse-keeper
```

```terminal
$ lhk --config [path to config]
```

## use from program
```terminal
$ npm i lighthouse-keeper
```

```js
const lhk = require("lighthouse-keeper");
const config = require("./path/to/config");

lhk.exec(config)
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
  targets: [{ url: "https://google.com" }...],
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

#### use csv target list
```csv
url
https://google.com
```

```js
const {readCsvTargetList} = require("lighthouse-keeper").config;

module.exports = {
  targets: readCsvTargetList("/path/to/*.csv"),
  ...
}
```

### reporters [required]
Array of Reporter instance.

#### use built-in reporters
There are two built-in reporters; `JsonReporter` and `CsvReporter`.

```js
const {JsonReporter,CsvReporter} = require("lhk").reporter;

module.exports = {
  targets: [{ url: "https://google.com" }...],
  reporters: [
    new JsonReporter("path/to/output.json"),
    new CsvReporter("path/to/output.csv")
  ],
  ...
}
```

#### use custom reporters

```js
const {Reporter} = require("lighthouse-keeper").reporter;

class MyReporter extends Reporter{
  constructor(){
    super();
  }
  open(){...}
  write(){...}
  close(){...}
}
```

```js
const MyReporter = require("path/to/my-reporter");

{
  targets: [{ url: "https://google.com" }...],
  reporters: [
    new MyReporter()
  ],
  ...
}
```


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