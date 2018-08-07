const Context = require("./context/context");
const {launchChromes} = require("./runner/launch-chrome");
const {execLighthouse} = require("./runner/exec-lighthouse");

exports.collectPerf = function({targets, reporters, chromeNum}){
  const context = new Context(targets, reporters);
  const work = execLighthouse.bind(null, context);
  const workers = launchChromes(chromeNum).map((launchChrome) => {
    return launchChrome.then(work);
  })
  return Promise.all(workers).then(context.close.bind(context));
}