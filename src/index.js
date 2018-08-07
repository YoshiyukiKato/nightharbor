const {collectPerf} = require("./perf-collector");
const {readConfig} = require("./config/config-reader");
const Reporter = require("./reporter/reporter");

module.exports = {
  collectPerf,
  readConfig,
  Reporter
}