const defaultLighthouseConfig = require("./config/lighthouse-config");
const lighthouse = require("lighthouse");

/**
 * ligthouseを実行する。context内のtargetを順に取り出し、targetがなくなるまで再帰的に処理を行う
 * @param {Context} context 
 * @param {Chrome} chrome
 */
function execLighthouse(lighthouseConfig, context, chrome) {
  const opts = {
    port: chrome.port
  }
  const target = context.getNextTarget();

  if (!!target) {
    return lighthouse(target.url, opts, lighthouseConfig)
      .then((result) => {
        context.addReport(target, result);
        return execLighthouse(lighthouseConfig, context, chrome);
      })
      .catch((err) => {
        return chrome.kill().then(() => {
          throw err;
        }).catch(() => {

        })
      });
  } else {
    return chrome.kill();
  }
}

exports.execLighthouse = execLighthouse;