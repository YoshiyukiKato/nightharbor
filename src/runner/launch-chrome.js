const chromeLauncher = require('chrome-launcher');
const defaultChromeConfig = require("./config/chrome-config");

/**
 * 指定した数のchromeインスタンスを生成する
 * @param {number} chromeNum chromeインスタンスの数
 * @return {Chrome[]} chormeインスタンスの配列
 */
exports.launchChromes = function (chromeConfig, chromeNum) {
  const chromes = [];
  const config = Object.assign(defaultChromeConfig, chromeConfig);
  for (let i = 0; i < chromeNum; i++) {
    chromes.push(chromeLauncher.launch(config));
  }
  return chromes;
}