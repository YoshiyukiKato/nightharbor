const puppeteer = require("puppeteer");
const defaultPuppeteerConfig = require("./config/puppeteer-config");

/**
 * 指定した数のchromeインスタンスを生成する
 * @param {number} chromeNum chromeインスタンスの数
 * @return {Chrome[]} chormeインスタンスの配列
 */
exports.launchChromes = function (chromeConfig, chromeNum) {
  const chromes = [];
  const config = Object.assign(defaultPuppeteerConfig, chromeConfig);
  for (let i = 0; i < chromeNum; i++) {
    chromes.push(puppeteer.launch(config));
  }
  return chromes;
}