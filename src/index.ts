import {normalizeConfig} from "./config/normalizer";
import {collectPerf} from "./core";
import {IConfiguration} from "./interface";

export function exec(config: IConfiguration) {
  return collectPerf(normalizeConfig(config));
}
