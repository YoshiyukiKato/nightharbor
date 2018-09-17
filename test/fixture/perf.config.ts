import path from "path";
import {SimpleLoader} from "../../src/loader";
import {SimpleReporter} from "../../src/reporter";

const csvOutputPath = path.resolve(__dirname, "../outputs/result.csv");
const jsonOutputPath = path.resolve(__dirname, "../outputs/result.json");

export = {
  chromeNum: 1,
  loaders: [
    new SimpleLoader([
      { url: "https://google.com" },
    ]),
  ],
  reporters: [
    new SimpleReporter(),
  ],
};
