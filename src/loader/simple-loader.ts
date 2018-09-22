import {ILoader} from "../interface";

export default class SimpleLoader implements ILoader<any> {
  private targets: any[];

  constructor(targets: any[]) {
    this.targets = targets;
  }

  public load(): Promise<any[]> {
    return Promise.resolve(this.targets);
  }
}
