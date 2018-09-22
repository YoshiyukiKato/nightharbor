import { ILHConfiguration } from "../interface";
import defaultConfig from "./default";

/**
 * normalize configuration
 * @function normalizeConfig
 * @return {any}
 */
export function normalizeConfig(config: ILHConfiguration) {
  return overrideConfig(
    overrideConfig(defaultConfig, config),
    {
      lighthouseConfig: overrideConfig(defaultConfig.lighthouseConfig, config.lighthouseConfig),
      puppeteerConfig: overrideConfig(defaultConfig.puppeteerConfig, config.puppeteerConfig),
    },
  );
}

function overrideConfig(baseConfig: any, customConfig: any) {
  return Object.assign(Object.assign({}, baseConfig), customConfig);
}
