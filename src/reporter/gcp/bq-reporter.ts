import {IReporter} from "../../interface";

export default class BQReporter implements IReporter {
  private bq: any;
  private dataset: string;
  private table: string;
  private resultDataList: any[];

  constructor(bq: any, dataset: string, table: string) {
    this.bq = bq;
    this.dataset = dataset;
    this.table = table;
    this.resultDataList = [];
  }

  public open(): void {
    return;
  }

  public write(result: any): void {
    const dataKeyParsed = Object.keys(result).reduce((acc: any, key: string) => {
      acc[key.replace(/-/g, "_")] = result[key];
      return acc;
    }, {});
    this.resultDataList.push(dataKeyParsed);
  }

  public close(): Promise<any> {
    return this.bq
      .dataset(this.dataset)
      .table(this.table)
      .insert(this.resultDataList)
      .then();
  }
}
