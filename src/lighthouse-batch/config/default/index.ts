import {ILHConfiguration} from "../../interface";
import lighthouseConfig from "./lighthouse-config";
import puppeteerConfig from "./puppeteer-config";

const defaultConfig: ILHConfiguration = {
  chromeNum: 1,
  lighthouseConfig,
  loaders: [],
  puppeteerConfig,
  reporters: [],
};

export default defaultConfig;
