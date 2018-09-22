import cliProgress from "cli-progress";
import { ILoader, IReporter } from "../interface";

/**
 * manage context of asynchronous lighthouse executions
 * @class
 * @name Context
 */
export default class Context<Target, Result> {
  private targets: Target[];
  private loaders: Array<ILoader<Target>>;
  private reporters: Array<IReporter<Result>>;
  private progressBar: cliProgress.Bar;

  /**
   * @constructor
   * @param {ILoader[]} loaders
   * @param {IReporter} reporter
   */
  constructor(loaders: Array<ILoader<Target>>, reporters: Array<IReporter<Result>>) {
    this.targets = [];
    this.loaders = loaders;
    this.reporters = reporters;
    this.progressBar = new cliProgress.Bar({}, cliProgress.Presets.shades_classic);
  }

  /**
   * initialize targets in context by exec registered loaders
   * @return {Promise<Context>}
   */
  public async loadTargets(): Promise<Context<Target, Result>> {
    const loaderPromises = this.loaders.map((loader: ILoader<Target>) => loader.load());
    const results = await Promise.all(loaderPromises);
    this.targets = results.reduce((acc: Target[], targets: Target[]) => [...acc, ...targets], []);
    this.progressBar.start(this.targets.length, 0);
    return this;
  }

  /**
   * get next lighthouse targets
   * @return {Target[]} next targets
   */
  public getNextTargets(targetNum= 1): Target[] {
    const targets: Target[] = [];
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
   * @param {Result} result result of lighthouse execution for the target
   */
  public addReport(report: any): void {
    this.reporters.forEach((reporter: IReporter<Result>) => reporter.write(report));
    this.progressBar.increment(1);
  }

  /**
   * close execution context
   */
  public close() {
    this.reporters.forEach((reporter: IReporter<Result>) => reporter.close());
    this.progressBar.stop();
    return this;
  }
}
