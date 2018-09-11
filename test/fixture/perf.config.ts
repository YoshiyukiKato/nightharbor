import path from "path";
import {CsvReporter,JsonReporter} from "../../src/reporter";
import {SimpleTargetLoader} from "../../src/target-loader";

const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

export = {
  chromeNum: 1,
  reporters: [
    new CsvReporter(csvOutputPath),
    new JsonReporter(jsonOutputPath)
  ],
  targetLoaders: [
    new SimpleTargetLoader([
      { url: "https://google.com" },
    ]),
  ],
};
