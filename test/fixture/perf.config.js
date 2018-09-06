const path = require("path");
const {CsvReporter,JsonReporter} = require("../../src/reporter");
const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

module.exports = {
  targets: [
    { url: 'https://google.com'}
  ],
  reporters: [
    new CsvReporter(csvOutputPath),
    new JsonReporter(jsonOutputPath)
  ],
  chromeNum: 1
};