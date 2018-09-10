import assert from "power-assert";
import {exec} from "../src";
import testConfig from "./fixture/perf.config.js";

describe("collect perf", () => {
  it("runs with no error", () => {
    return exec(testConfig).then(() => assert(true));
  });
});