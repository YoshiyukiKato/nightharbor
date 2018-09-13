import {ILoader, ITarget} from "../interface";

export default class SimpleLoader implements ILoader {
  private targets: ITarget[];

  constructor(targets: ITarget[]) {
    this.targets = targets;
  }

  public load(): Promise<ITarget[]> {
    return Promise.resolve(this.targets);
  }
}
