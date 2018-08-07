const fs = require("fs");
const csvSync = require('csv-load-sync');
const glob = require("glob");

/**
 * configのcsvファイルを読み出して、lighthouse実行対象オブジェクトのリストを返す
 * @function readConfig
 * @return {Promise<Config>}
 */
function readConfig(configFilePath){
  const {chromeNum=2, targets=[], targetFiles=[], reporters=[]} = require(configFilePath);
  const targetsFromFiles = getTargetList(targetFiles);
  return { 
    reporters,
    chromeNum,
    targets: [...targets, ...targetsFromFiles]
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
  readConfig,
  getTargetList
}

/**
 * lighthouse実行設定
 * @typedef Config
 * @prop {number} chromeNum
 * @prop {Target[]} targetList
 * @prop {any[]} reporters 
 */

 /**
 * lighthouse実行対象オブジェクト
 * @typedef Target
 * @prop {string} site_id
 * @prop {string} page_id
 * @prop {string} url
 */