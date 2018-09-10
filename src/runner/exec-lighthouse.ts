import lighthouse from "lighthouse";
import {URL} from "url";
import Context from "../context/context";
import {launchChromes} from "./launch-chrome";

/**
 * ligthouseを実行する。context内のtargetを順に取り出し、targetがなくなるまで再帰的に処理を行う
 * @param {Context} context
 * @param {Chrome} chrome
 */
export function execLighthouse(lighthouseConfig: any, puppeteerConfig: any, chromeNum: number, context: Context) {
  const targets = context.getNextTargets(chromeNum);
  if (targets.length > 0) {
    return launchChromes(puppeteerConfig, targets.length)
      .then((browsers: any[]) => {
        const works = browsers.map((browser, index) => {
          const target = targets[index];
          const port = new URL(browser.wsEndpoint()).port;
          const opts: any = {port};
          return lighthouse(target.url, opts, lighthouseConfig)
            .then((result: any) => {
              context.addReport(target, result);
              return browser.close();
            });
        });

        return Promise.all(works).then(() => {
          return execLighthouse(lighthouseConfig, puppeteerConfig, chromeNum, context);
        });
      })
      .then(() => context);
  } else {
    return Promise.resolve(context);
  }
}
