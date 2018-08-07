const path = require("path");
const cli = require("commander");
const {collectPerf} = require("../src");
const {readConfig} = require("./config/config-reader");
const {version} = require("../package.json");

cli
  .version(version)
  .option("-c, --config [path to config file]", "")
  .parse(process.argv);

const configFilePath = path.resolve(process.cwd(), !!cli.config ? cli.config : "./perf.config.js");
readConfig(configFilePath)
  .then(collectPerf)
  .then()
  .catch(console.error);