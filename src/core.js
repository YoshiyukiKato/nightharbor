const Context = require("./context/context");
const {launchChromes} = require("./runner/launch-chrome");
const {execLighthouse} = require("./runner/exec-lighthouse");
const defaultPuppeteerConfig = require("./runner/config/puppeteer-config");
const defaultLighthouseConfig = require("./runner/config/lighthouse-config");

exports.collectPerf = function({targets, reporters, chromeNum, puppeteerConfig, lighthouseConfig}){
  const context = new Context(targets, reporters);
  const ppConfig = Object.assign(defaultPuppeteerConfig, puppeteerConfig);
  const lhConfig = Object.assign(defaultLighthouseConfig, lighthouseConfig);
  const work = execLighthouse.bind(null, lhConfig, context);
  const workers = launchChromes(ppConfig, chromeNum).map((launchChrome) => {
    return launchChrome.then(work);
  })
  return Promise.all(workers).then(context.close.bind(context));
}