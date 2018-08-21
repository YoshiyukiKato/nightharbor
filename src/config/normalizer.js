const defaultConfig = require("./default-config");

/**
 * normalize configuration
 * @function normalizeConfig
 * @return {Promise<Config>}
 */
function normalizeConfig(config){
  const {
    chromeNum,
    puppeteerConfig,
    lighthouseConfig,
    targets,
    reporters
  } = Object.assign(defaultConfig, config);

  return { 
    chromeNum,
    puppeteerConfig,
    lighthouseConfig,
    targets,
    reporters
  };
}

module.exports = {
  normalizeConfig
}

/**
 * lighthouse result
 * @typedef Config
 * @prop {number} chromeNum
 * @prop {Target[]} targets
 * @prop {any[]} reporters 
 */

 /**
 * lighthouse target
 * @typedef Target
 * @prop {string} site_id
 * @prop {string} page_id
 * @prop {string} url
 */