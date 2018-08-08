const csvSync = require('csv-load-sync');
const defaultConfig = require("./default-config");
const glob = require("glob");

/**
 * configのcsvファイルを読み出して、lighthouse実行対象オブジェクトのリストを返す
 * @function readConfig
 * @return {Promise<Config>}
 */
function normalizeConfig(config){
  const {
    chromeNum,
    chromeConfig,
    lighthouseConfig,
    targetFiles,
    targets,
    reporters
  } = Object.assign(defaultConfig, config);
  const targetsFromFiles = getTargetList(targetFiles);

  return { 
    chromeNum,
    chromeConfig,
    lighthouseConfig,
    targets: [...targets, ...targetsFromFiles],
    reporters
  };
}

function getTargetList(targetConfigPathPatterns){
  return targetConfigPathPatterns.map((pattern) => glob.sync(pattern))
    .reduce((acc, targetConfigList) => [...acc, ...targetConfigList], [])
    .map(loadTargetList)
    .reduce((acc, targetList) => [...acc, ...targetList], []);
}

function loadTargetList(targetConfigPath){
  return csvSync(targetConfigPath);
};

module.exports = {
  normalizeConfig,
  getTargetList
}

/**
 * lighthouse実行設定
 * @typedef Config
 * @prop {number} chromeNum
 * @prop {Target[]} targets
 * @prop {any[]} reporters 
 */

 /**
 * lighthouse実行対象オブジェクト
 * @typedef Target
 * @prop {string} site_id
 * @prop {string} page_id
 * @prop {string} url
 */