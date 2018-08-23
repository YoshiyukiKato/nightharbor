const Context = require("./context/context");
const {execLighthouse} = require("./runner/exec-lighthouse");
const defaultPuppeteerConfig = require("./runner/config/puppeteer-config");
const defaultLighthouseConfig = require("./runner/config/lighthouse-config");

exports.collectPerf = function({targets, reporters, chromeNum, puppeteerConfig, lighthouseConfig}){
  const context = new Context(targets, reporters);
  const ppConfig = Object.assign(defaultPuppeteerConfig, puppeteerConfig);
  const lhConfig = Object.assign(defaultLighthouseConfig, lighthouseConfig);
  return execLighthouse(lhConfig, ppConfig, chromeNum, context)
    .then(context.close.bind(context));
}