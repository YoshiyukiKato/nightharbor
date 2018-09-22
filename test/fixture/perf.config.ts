import path from "path";
import {SimpleLoader} from "../../src/loader";
import {SimpleReporter} from "../../src/reporter";

export = {
  batchSize: 1,
  loaders: [
    new SimpleLoader([
      { url: "https://google.com" },
    ]),
  ],
  reporters: [
    new SimpleReporter(),
  ],
};
