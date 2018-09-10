const path = require("path");
const {SimpleTargetLoader} = require("../../dist/target-loader");
const {CsvReporter,JsonReporter} = require("../../dist/reporter/local");
const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

module.exports = {
  targetLoaders:[
    new SimpleTargetLoader([
      { url: 'https://google.com'}
    ])
  ],
  reporters: [
    new CsvReporter(csvOutputPath),
    new JsonReporter(jsonOutputPath)
  ],
  chromeNum: 1
};