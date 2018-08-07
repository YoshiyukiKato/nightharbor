const path = require("path");
const assert = require("power-assert");
const {collectPerf,readConfig} = require("..");
const testConfigPath = path.resolve(__dirname, "./fixture/perf.config.js");

describe("collect perf", () => {
  it("runs with no error", () => {
    return readConfig(testConfigPath).then(collectPerf).then(() => assert(true));
  });
});