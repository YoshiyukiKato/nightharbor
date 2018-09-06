const defaultConfig = require("./default");


/**
 * normalize configuration
 * @function normalizeConfig
 * @return {any}
 */
function normalizeConfig(config){
  return overrideConfig(
    overrideConfig(defaultConfig, config),
    {
      puppeteerConfig: overrideConfig(defaultConfig.puppeteerConfig, config.puppeteerConfig),
      lighthouseConfig: overrideConfig(defaultConfig.lighthouseConfig, config.lighthouseConfig)
    }
  );
}

function overrideConfig(defaultConfig, customConfig){
  return Object.assign(Object.assign({}, defaultConfig), customConfig);
}

module.exports = {
  normalizeConfig
}