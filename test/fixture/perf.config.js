const path = require("path");
const TestTargetLoader = require("./test-target-loader");
const {CsvReporter,JsonReporter} = require("../../src/reporter");
const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

module.exports = {
  targets: [
    { url: 'https://google.com'}
  ],
  targetLoaders:[
    new TestTargetLoader()
  ],
  reporters: [
    new CsvReporter(csvOutputPath),
    new JsonReporter(jsonOutputPath)
  ],
  chromeNum: 1
};