const config = require("./config");
const {normalizeConfig} = config;
const {collectPerf} = require("./core");
const reporter = require("./reporter");

function exec(configData){
  return collectPerf(normalizeConfig(configData));
}

module.exports = {
  config,
  exec,
  reporter
}