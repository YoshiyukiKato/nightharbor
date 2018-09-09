
import Context from "./context/context";
import {IConfiguration} from "./interface";
import {execLighthouse} from "./runner/exec-lighthouse";

export function collectPerf({
  targetLoaders,
  reporters,
  chromeNum,
  puppeteerConfig,
  lighthouseConfig,
}: IConfiguration) {
  const context = new Context(targetLoaders, reporters);
  return context.loadTargets()
    .then(execLighthouse.bind(null, lighthouseConfig, puppeteerConfig, chromeNum))
    .then(context.close.bind(context));
}
