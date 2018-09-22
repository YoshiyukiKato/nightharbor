import Context from "./context/context";
import {ILHConfiguration} from "./interface";
import {execLighthouse} from "./runner/exec-lighthouse";

export function collectPerf({
  loaders,
  reporters,
  chromeNum,
  puppeteerConfig,
  lighthouseConfig,
}: ILHConfiguration): Promise<any> {
  const context = new Context(loaders, reporters);
  return context.loadTargets()
    .then(execLighthouse.bind(null, lighthouseConfig, puppeteerConfig, chromeNum))
    .then(context.close.bind(context));
}
