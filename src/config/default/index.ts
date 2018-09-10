import {IConfiguration} from "../../interface";
import lighthouseConfig from "./lighthouse-config";
import puppeteerConfig from "./puppeteer-config";

const defaultConfig: IConfiguration = {
  chromeNum: 1,
  lighthouseConfig,
  puppeteerConfig,
  reporters: [],
  targetLoaders: [],
};

export default defaultConfig;
