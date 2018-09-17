import cliProgress from "cli-progress";
import { ILoader, IReporter, ITarget } from "../interface";
import { generateResult } from "./result-generator";

/**
 * manage context of asynchronous lighthouse executions
 * @class
 * @name Context
 */
export default class Context {
  private targets: ITarget[];
  private loaders: ILoader[];
  private reporters: IReporter[];
  private progressBar: cliProgress.Bar;

  /**
   * @constructor
   * @param {ILoader[]} loaders
   * @param {IReporter} reporter
   */
  constructor(loaders: ILoader[], reporters: IReporter[]) {
    this.targets = [];
    this.loaders = loaders;
    this.reporters = reporters;
    this.progressBar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
  }

  /**
   * initialize targets in context by exec registered loaders
   * @return {Promise<Context>}
   */
  public loadTargets() {
    const loaderPromises = this.loaders.map((loader: ILoader) => loader.load());
    return Promise.all(loaderPromises)
      .then((results: any[]) => {
        this.targets = results.reduce((acc: ITarget[], targets: ITarget[]) => [...acc, ...targets], []);
        this.progressBar.start(this.targets.length, 0);
        return this;
      });
  }

  /**
   * get next lighthouse targets
   * @return {ITarget[]} next targets
   */
  public getNextTargets(targetNum= 1): ITarget[] {
    const targets: ITarget[] = [];
    let target: any;
    for (let i = 0; i < targetNum; i++) {
      target = this.targets.shift();
      if (!!target) {
        targets.push(target);
      }
    }
    return targets;
  }

  /**
   * pass result data to reporters.
   * @param {Target} target info about lighthouse target
   * @param {{lhr}} lighthouseResult result of lighthouse execution for the target
   */
  public addReport(target: ITarget, lighthouseResult: any): void {
    this.reporters.forEach((reporter: IReporter) => reporter.write(generateResult(target, lighthouseResult)));
    this.progressBar.increment(1);
  }

  /**
   * close execution context
   */
  public close() {
    this.reporters.forEach((reporter: IReporter) => reporter.close());
    this.progressBar.stop();
    return this;
  }
}
