const path = require("path");
const FileReporter = require("../../src/reporter/file-reporter");
const targetPattern = path.resolve(__dirname, "./targets/*.csv");
const outputPath = path.resolve(__dirname, "./result.txt");

module.exports = {
  targetFiles: [targetPattern],
  reporters: [
    new FileReporter(outputPath),
  ],
  chromeNum: 1
};