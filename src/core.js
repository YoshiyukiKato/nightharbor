const Context = require("./context/context");
const {launchChromes} = require("./runner/launch-chrome");
const {execLighthouse} = require("./runner/exec-lighthouse");
const defaultChromeConfig = require("./runner/config/chrome-config");
const defaultLighthouseConfig = require("./runner/config/lighthouse-config");

exports.collectPerf = function({targets, reporters, chromeNum, chromeConfig, lighthouseConfig}){
  const context = new Context(targets, reporters);
  const chConfig = Object.assign(defaultChromeConfig, chromeConfig);
  const lhConfig = Object.assign(defaultLighthouseConfig, lighthouseConfig);
  const work = execLighthouse.bind(null, lhConfig, context);
  const workers = launchChromes(chConfig, chromeNum).map((launchChrome) => {
    return launchChrome.then(work);
  })
  return Promise.all(workers).then(context.close.bind(context));
}