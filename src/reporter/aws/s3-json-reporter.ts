import {S3} from "aws-sdk";
import S3Reporter from "./s3-reporter";

export default class S3JsonReporter extends S3Reporter {
  private bodyData: { results: any[] };

  constructor(s3: S3, bucketName: string, key: string) {
    super(s3, bucketName, key);
    this.bodyData = { results: [] };
  }

  public write(result: any): void {
    this.bodyData.results.push(result);
  }

  public close(): Promise<any> {
    this.body = JSON.stringify(this.bodyData);
    return super.close();
  }
}
