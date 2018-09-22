import {Context} from "./context";

export interface IConfiguration<Target, Result> {
  loaders: Array<ILoader<Target>>;
  reporters: Array<IReporter<Result>>;
}

export interface IExecutor <Target, Result> {
  exec(config: IConfiguration<Target, Result>, context: Context<Target, Result>): any;
}

export interface IReporter<Result> {
  write(result: Result): void;
  close(): Promise<any>;
}

export interface ILoader<Target> {
  load(): Promise<Target[]>;
}

export interface ILHConfiguration extends IConfiguration<ILHTarget, any> {
  chromeNum?: number;
  puppeteerConfig?: any;
  lighthouseConfig?: any;
}

export interface ILHTarget {
  url: string;
  [key: string]: string;
}
