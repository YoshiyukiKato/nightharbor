const path = require("path");
const cli = require("commander");
const {exec} = require("../src");
const {version} = require("../package.json");

cli
  .version(version)
  .option("-c, --config [path to config file]", "specify config file")
  .parse(process.argv);

const configFilePath = path.resolve(process.cwd(), !!cli.config ? cli.config : "./perf.config.js");
const config = require(configFilePath);
exec(config)
  .then()
  .catch(console.error);