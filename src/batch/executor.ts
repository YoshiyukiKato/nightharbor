import {Context} from "../context";
import { IConfiguration } from "../interface";

export default abstract class Executor<Target, Result> {
  public async execBatch(config: IConfiguration<Target, Result>, context: Context<Target, Result>) {
    const targets = context.getNextTargets(config.batchSize);
    if (targets.length > 0) {
      for (const target of targets) {
        const report = await this.batchJob(config, target);
        context.addReport(report);
      }
      return this.execBatch(config, context);
    } else {
      return context;
    }
  }
  protected async abstract batchJob(config: IConfiguration<Target, Result>, targets: Target): Promise<Result>;
}
