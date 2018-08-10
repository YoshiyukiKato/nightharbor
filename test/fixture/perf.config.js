const path = require("path");
const {CsvReporter,JsonReporter} = require("../../src/reporter");
const {readCsvTargetList} = require("../../src/config/target-reader");
const targetPattern = path.resolve(__dirname, "./targets/*.csv");
const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

module.exports = {
  targets: readCsvTargetList([targetPattern]),
  reporters: [
    new CsvReporter(csvOutputPath),
    new JsonReporter(jsonOutputPath)
  ],
  chromeNum: 1
};