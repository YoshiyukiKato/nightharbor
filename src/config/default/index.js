const puppeteerConfig = require("./puppeteer-config");
const lighthouseConfig = require("./lighthouse-config");

module.exports = {
  chromeNum: 1,
  targets: [],
  targetLoaders: [],
  reporters: [],
  puppeteerConfig,
  lighthouseConfig
};