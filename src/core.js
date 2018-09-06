const Context = require("./context/context");
const {execLighthouse} = require("./runner/exec-lighthouse");

exports.collectPerf = function({targets, reporters, chromeNum, puppeteerConfig, lighthouseConfig}){
  const context = new Context(targets, reporters);
  return execLighthouse(lighthouseConfig, puppeteerConfig, chromeNum, context)
    .then(context.close.bind(context));
}