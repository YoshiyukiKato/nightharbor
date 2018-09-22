import {normalizeConfig} from "./config/normalizer";
import {collectPerf} from "./core";
import {ILHConfiguration} from "./interface";

export function exec(config: ILHConfiguration) {
  return collectPerf(normalizeConfig(config));
}
