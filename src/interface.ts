export interface IConfiguration<Target, Result> {
  loaders: Array<ILoader<Target>>;
  reporters: Array<IReporter<Result>>;
  batchSize?: number;
}

export interface IReporter<Result> {
  write(result: Result): void;
  close(): Promise<any>;
}

export interface ILoader<Target> {
  load(): Promise<Target[]>;
}
