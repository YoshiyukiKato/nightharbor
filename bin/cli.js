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
const config = readConfig(configFilePath);
collectPerf(config)
  .then()
  .catch(console.error);