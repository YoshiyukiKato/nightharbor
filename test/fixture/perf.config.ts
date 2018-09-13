import path from "path";
import {SimpleLoader} from "../../src/loader";
import {CsvReporter, JsonReporter} from "../../src/reporter";

const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

export = {
  chromeNum: 1,
  reporters: [
    new CsvReporter(csvOutputPath),
    new JsonReporter(jsonOutputPath),
  ],
  targetLoaders: [
    new SimpleLoader([
      { url: "https://google.com" },
    ]),
  ],
};
