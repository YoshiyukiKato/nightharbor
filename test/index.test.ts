import assert from "power-assert";
import {exec} from "../src";
import testConfig from "./fixture/perf.config";

describe("collect perf", () => {
  it("runs with no error", () => {
    return exec(testConfig).then(() => assert(true));
  });
});
