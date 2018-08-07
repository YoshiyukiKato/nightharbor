const chromeLauncher = require('chrome-launcher');
const chromeConfig = require("./config/chrome-config");

/**
 * 指定した数のchromeインスタンスを生成する
 * @param {number} chromeNum chromeインスタンスの数
 * @return {Chrome[]} chormeインスタンスの配列
 */
exports.launchChromes = function (chromeNum) {
  const chromes = [];
  for (let i = 0; i < chromeNum; i++) {
    chromes.push(chromeLauncher.launch(chromeConfig));
  }
  return chromes;
}