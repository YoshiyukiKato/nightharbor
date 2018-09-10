import fs from "fs";
import {IReporter} from "../../interface";

/**
 * output result to csv file
 */
export default class CsvReporter implements IReporter {
  private headers: null|string[];
  private ws: fs.WriteStream;

  constructor(outputFilePath: string) {
    this.headers = null;
    this.ws = fs.createWriteStream(outputFilePath);
  }

  public open() {
    return;
  }

  public write(result: any) {
    if (!this.headers) {
      this.headers = Object.keys(result);
      this.ws.write(this.headers.join(",") + "\n");
    }
    const row = this.headers.map((header) => {
      return result[header] || "";
    }).join(",");
    this.ws.write(row + "\n");
  }

  public close(): Promise<void> {
    this.ws.close();
    return Promise.resolve();
  }
}
