import {ITarget, ITargetLoader} from "../interface";

export default class SimpleTargetLoader implements ITargetLoader {
  private targets: ITarget[];

  constructor(targets: ITarget[]) {
    this.targets = targets;
  }

  public load(): Promise<ITarget[]> {
    return Promise.resolve(this.targets);
  }
}
