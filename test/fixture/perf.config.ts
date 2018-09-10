import path from "path";
import {SimpleTargetLoader} from "../../src/target-loader";
import {CsvReporter,JsonReporter} from "../../src/reporter/local";
const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

export = {
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
