import {S3} from "aws-sdk";
import S3Reporter from "./s3-reporter";

export default class S3CsvReporter extends S3Reporter {
  private headers: null|string[];

  constructor(s3: S3, bucketName: string, key: string) {
    super(s3, bucketName, key);
    this.headers = null;
  }

  public write(result: any): void {
    if (!this.headers) {
      this.headers = Object.keys(result);
      this.body += (this.headers.join(",") + "\n");
    }
    this.body += (this.headers.map((header) => {
      return result[header] || "";
    }).join(",") + "\n");
  }
}
