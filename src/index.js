const {normalizeConfig} = require("./config/config-reader");
const {collectPerf} = require("./core");
const reporter = require("./reporter");

function exec(config){
  return collectPerf(normalizeConfig(config));
}

module.exports = {
  exec,
  reporter
}