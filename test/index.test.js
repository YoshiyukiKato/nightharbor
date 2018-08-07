const path = require("path");
const assert = require("power-assert");
const {collectPerf,readConfig} = require("..");
const testConfigPath = path.resolve(__dirname, "./fixture/perf.config.js");
const testConfig = readConfig(testConfigPath);

describe("collect perf", () => {
  it("runs with no error", () => {
    return collectPerf(testConfig).then(() => assert(true));
  });
});