const Context = require("./context/context");
const {execLighthouse} = require("./runner/exec-lighthouse");

exports.collectPerf = function({targets, targetLoaders, reporters, chromeNum, puppeteerConfig, lighthouseConfig}){
  const context = new Context(targets, targetLoaders, reporters);
  return context.loadTargets()
    .then(execLighthouse.bind(null, lighthouseConfig, puppeteerConfig, chromeNum))
    .then(context.close.bind(context));
}