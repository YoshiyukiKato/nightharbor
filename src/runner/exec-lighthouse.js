const lighthouse = require("lighthouse");
const {URL} = require("url");

/**
 * ligthouseを実行する。context内のtargetを順に取り出し、targetがなくなるまで再帰的に処理を行う
 * @param {Context} context 
 * @param {Chrome} chrome
 */
function execLighthouse(lighthouseConfig, context, browser) {
  const port = new URL(browser.wsEndpoint()).port;
  const opts = {
    port: port
  }
  const target = context.getNextTarget();
  if (!!target) {
    return lighthouse(target.url, opts, lighthouseConfig)
      .then((result) => {
        context.addReport(target, result);
        return execLighthouse(lighthouseConfig, context, browser);
      })
      .catch((err) => {
        return browser.close().then(() => {
          throw err;
        }).catch(() => {

        })
      });
  } else {
    return browser.close();
  }
}

exports.execLighthouse = execLighthouse;