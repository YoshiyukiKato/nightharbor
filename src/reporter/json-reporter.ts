import fs from "fs";
import {IReporter} from "../interface";

/**
 * output result to json file
 */
export default class JsonReporter implements IReporter {
  private isFirstDataWritten: boolean;
  private ws: fs.WriteStream;

  constructor(outputFilePath: string) {
    this.ws = fs.createWriteStream(outputFilePath);
    this.isFirstDataWritten = false;
  }

  public open() {
    this.ws.write("{\"results\":[");
  }

  public write(result: any) {
    const separator = this.isFirstDataWritten ? "," : "";
    this.isFirstDataWritten = true;
    const reportJson = JSON.stringify(result);
    this.ws.write(separator + reportJson);
  }

  public close() {
    this.ws.write("]}");
    this.ws.close();
    return Promise.resolve();
  }
}
