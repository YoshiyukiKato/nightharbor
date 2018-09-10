import puppeteer from "puppeteer";

/**
 * 指定した数のchromeインスタンスを生成する
 * @param {number} chromeNum chromeインスタンスの数
 * @return {Chrome[]} chormeインスタンスの配列
 */
export function launchChromes(config: any, chromeNum: number) {
  const chromes: Array<Promise<any>> = [];
  for (let i = 0; i < chromeNum; i++) {
    chromes.push(puppeteer.launch(config));
  }
  return Promise.all(chromes);
}
