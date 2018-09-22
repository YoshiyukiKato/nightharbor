import {Context} from "../context";
import {IExecutor, ILHConfiguration, ILHTarget} from "../interface";

export default class LighthouseExecutor implements IExecutor<ILHTarget, any> {
  public exec(config: ILHConfiguration, context: Context<any, any>) {
    return;
  }
}
