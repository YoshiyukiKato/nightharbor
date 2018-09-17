import {IReporter} from "../interface";

export default class SimpleReporter implements IReporter {
  public write(result: any): void {
    const {url, ...resultExceptUrl} = result;
    const headIndent = "  ";
    const bodyIndent = "    ";
    const head = "\n" + headIndent + url + "\n";
    const bottom = "\n";
    const body = Object.keys(resultExceptUrl).reduce((acc: string, key: string) => {
      return acc + `${bodyIndent}${key}: ${resultExceptUrl[key]}\n`;
    }, "");
    console.log(head + body + bottom);
  }

  public close(): Promise<any> {
    return Promise.resolve();
  }
}
