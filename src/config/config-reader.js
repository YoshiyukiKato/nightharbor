const fs = require("fs");
const csvtojson = require("csvtojson");
const glob = require("glob-promise");

/**
 * configのcsvファイルを読み出して、lighthouse実行対象オブジェクトのリストを返す
 * @function readConfig
 * @return {Promise<Config>}
 */
exports.readConfig = function(configFilePath){
  const {chromeNum=2, targets=[], targetFiles=[], reporters=[]} = require(configFilePath);
  return getTargetList(targetFiles).then((targetsFromFiles) =>  {
    return { 
      reporters,
      chromeNum,
      targets: [...targets, ...targetsFromFiles]
    }
  })
}

function getTargetList(targetConfigPathPatterns){
  return Promise.all(targetConfigPathPatterns.map(glob))
    .then((targetConfigLists) => targetConfigLists.reduce((acc, targetConfigList) => [...acc, ...targetConfigList], []))
    .then((targetConfigList) => Promise.all(targetConfigList.map(loadTargetList)))
    .then((targetLists) => {
      return targetLists.reduce((acc, targetList) => [...acc, ...targetList], [])
    });
}

function loadTargetList(targetConfigPath){
  const stream = fs.createReadStream(targetConfigPath);
  return csvtojson().fromStream(stream);
};

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