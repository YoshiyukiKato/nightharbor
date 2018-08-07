const path = require("path");
const FileReporter = require("../../src/reporter/file-reporter");
const {getTargetList} = require("../../src/config/config-reader");
const targetPattern = path.resolve(__dirname, "./targets/*.csv");
const outputPath = path.resolve(__dirname, "./result.txt");

module.exports = {
  targets: getTargetList([targetPattern]),
  reporters: [
    new FileReporter(outputPath),
  ],
  chromeNum: 1
};