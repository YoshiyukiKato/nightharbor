import { generateResult } from "./result-generator";

// import cliProgress from 'cli-progress';

/**
 * manage context of asynchronous lighthouse executions
 * @class
 * @name Context
 */
export default class Context {
  private targets: any[];
  private targetLoaders: any[];
  private reporters: any[];

  /**
   * @constructor
   * @param {Target[]} targets
   * @param {TargetLoader[]} targetLoaders
   * @param {Reporter} reporter
   */
  constructor(targetLoaders: any[], reporters: any[]) {
    this.targets = [];
    this.targetLoaders = targetLoaders;
    this.reporters = reporters;
    this.reporters.forEach((reporter: any) => reporter.open());
  }

  /**
   * initialize targets in context by exec registered loaders
   * @return {Promise<Context>}
   */
  public loadTargets() {
    const loaderPromises = this.targetLoaders.map((targetLoader) => targetLoader.load());
    return Promise.all(loaderPromises)
      .then((results: any[]) => {
        this.targets = this.targets.concat(results.reduce((acc: any, targets: any[]) => [...acc, ...targets], []));
//        this.progressBar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
//        this.progressBar.start(this.targets.length, 0);
        return this;
      });
  }

  /**
   * get next lighthouse targets
   * @return {Target[]} next targets
   */
  public getNextTargets(targetNum= 1) {
    const targets: any[] = [];
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
  public addReport(target: any, lighthouseResult: any): void {
    this.reporters.forEach((reporter: any) => reporter.write(generateResult(target, lighthouseResult)));
//    this.progressBar.increment();
  }

  /**
   * close execution context
   */
  public close() {
    this.reporters.forEach((reporter: any) => reporter.close());
//    this.progressBar.stop();
    return this;
  }
}
