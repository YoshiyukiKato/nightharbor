import Context from "../context/context";
import {IConfiguration} from "../interface";
import Executor from "./executor";

export default class Batch<Target, Result> {
  private executor: Executor<Target, Result>;
  constructor(executor: Executor<Target, Result>) {
    this.executor = executor;
  }

  public async execute(config: IConfiguration<Target, Result>) {
    const context = new Context<Target, Result>(config.loaders, config.reporters);
    await context.loadTargets();
    await this.executor.execBatch(config, context);
    return context.close();
  }
}
