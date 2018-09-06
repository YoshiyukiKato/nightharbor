const puppeteerConfig = require("./puppeteer-config");
const lighthouseConfig = require("./lighthouse-config");

module.exports = {
  chromeNum: 1,
  targetFiles: [],
  targets: [],
  reporters: [],
  puppeteerConfig,
  lighthouseConfig
};