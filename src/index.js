const {normalizeConfig} = require("./config/normalizer");
const {collectPerf} = require("./core");

exports.exec = function(configData){
  return collectPerf(normalizeConfig(configData));
}