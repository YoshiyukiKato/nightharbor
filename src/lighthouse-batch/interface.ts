import {IConfiguration} from "../interface";

export interface ILHConfiguration extends IConfiguration<ILHTarget, any> {
  puppeteerConfig?: any;
  lighthouseConfig?: any;
}

export interface ILHTarget {
  url: string;
  [key: string]: string;
}
