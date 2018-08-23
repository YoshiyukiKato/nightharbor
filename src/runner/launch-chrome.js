const puppeteer = require("puppeteer");

/**
 * 指定した数のchromeインスタンスを生成する
 * @param {number} chromeNum chromeインスタンスの数
 * @return {Chrome[]} chormeインスタンスの配列
 */
exports.launchChromes = function (config, chromeNum) {
  const chromes = [];
  for (let i = 0; i < chromeNum; i++) {
    chromes.push(puppeteer.launch(config));
  }
  return Promise.all(chromes);
}