#!/usr/bin/env node
import cli from "commander";
import path from "path";
import {exec} from "../index.js";
import {ILHConfiguration} from "../interface.js";
import {version} from "../package.json";

cli
  .version(version)
  .option("-c, --config [path to config file]", "specify config file")
  .parse(process.argv);

const configFilePath = path.resolve(process.cwd(), !!cli.config ? cli.config : "./nhb.config.js");
const config: ILHConfiguration = require(configFilePath);

exec(config)
  .then()
  .catch((err: Error) => console.error(err));
