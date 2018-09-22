import {IReporter} from "../interface";

export default class SimpleReporter implements IReporter<any> {
  private results: any[];
  public constructor() {
    this.results = [];
  }

  public write(result: any): void {
    this.results.push(result);
  }

  public close(): Promise<any> {
    this.results.forEach((result) => {
      const {url, ...resultExceptUrl} = result;
      const headIndent = "  ";
      const bodyIndent = "    ";
      const head = "\n\n" + headIndent + url + "\n";
      const bottom = "\n";
      const body = Object.keys(resultExceptUrl).reduce((acc: string, key: string) => {
        return acc + `${bodyIndent}${key}: ${resultExceptUrl[key]}\n`;
      }, "");
      console.log(head + body + bottom);
    });
    return Promise.resolve();
  }
}
