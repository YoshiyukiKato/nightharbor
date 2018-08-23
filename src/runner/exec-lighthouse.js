const lighthouse = require("lighthouse");
const {launchChromes} = require("./launch-chrome");
const {URL} = require("url");

/**
 * ligthouseを実行する。context内のtargetを順に取り出し、targetがなくなるまで再帰的に処理を行う
 * @param {Context} context 
 * @param {Chrome} chrome
 */
function execLighthouse(lighthouseConfig, puppeteerConfig, chromeNum, context) {
  const targets = context.getNextTargets(chromeNum);
  if (targets.length > 0) {
    return launchChromes(puppeteerConfig, targets.length)
      .then((browsers) => {
        const works = browsers.map((browser, index) => {
          const target = targets[index];
          const port = new URL(browser.wsEndpoint()).port;
          const opts = {
            port: port
          }
          return lighthouse(target.url, opts, lighthouseConfig)
            .then((result) => {
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
    return context;
  }
}

exports.execLighthouse = execLighthouse;