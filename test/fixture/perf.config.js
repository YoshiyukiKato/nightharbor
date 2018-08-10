const path = require("path");
const {CsvReporter,JsonReporter} = require("../../src/reporter");
const {getTargetList} = require("../../src/config/config-reader");
const targetPattern = path.resolve(__dirname, "./targets/*.csv");
const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

module.exports = {
  targets: getTargetList([targetPattern]),
  reporters: [
    new CsvReporter(csvOutputPath),
    new JsonReporter(jsonOutputPath)
  ],
  chromeNum: 1
};