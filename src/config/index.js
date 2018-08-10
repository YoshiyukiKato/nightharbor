const {normalizeConfig} = require("./normalizer");
const {readCsvTargetList} = require("./target-reader");
const defaultConfig = require("./default-config");


module.exports = {
  defaultConfig,
  normalizeConfig,
  readCsvTargetList
}