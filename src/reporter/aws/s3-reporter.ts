import {S3} from "aws-sdk";
import {IReporter} from "../../interface";

export default class S3Reporter implements IReporter {
  protected body: string;
  private s3: S3;
  private bucketName: string;
  private key: string;

  constructor(s3: S3, bucketName: string , key: string) {
    this.s3 = s3;
    this.bucketName = bucketName;
    this.key = key;
    this.body = "";
  }

  public open(): void {
    return;
  }

  public write(result: any): void {
    return;
  }

  public close(): Promise<any> {
    return this.s3.putObject({
      Body: this.body,
      Bucket: this.bucketName,
      Key: this.key,
    }).promise().then();
  }
}
