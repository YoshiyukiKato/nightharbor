# perf-collector
A wrapper tool of [lighthouse](https://github.com/GoogleChrome/lighthouse) to collect multiple web-site performance data.

```terminal
$ npm i -g perf-collector
```


## configuration

```js
module.exports = {
  chromeNum: 2,
  targets: [{ url: "https://target.site" }...],
  reporters: [Reporter...],
  chromeConfig: {chromeConfig},
  lighthouseConfig: {lighthouseConfig}
}
```

### chromeNum
### targets
### reporter
### chromeConfig
see [config of Chrome Launcher](https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md)

### lighthouseConfig
see [config of LightHouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md)