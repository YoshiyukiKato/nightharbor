import {IConfiguration} from "../interface";

export interface ILHConfiguration extends IConfiguration<ILHTarget, any> {
  chromeNum?: number;
  puppeteerConfig?: any;
  lighthouseConfig?: any;
}

export interface ILHTarget {
  url: string;
  [key: string]: string;
}
