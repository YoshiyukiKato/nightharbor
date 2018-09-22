import lighthouse from "lighthouse";
import puppeteer from "puppeteer";
import {URL} from "url";
import Executor from "../batch/executor";
import { parseAudits } from "./audits-parser";
import { ILHConfiguration, ILHTarget } from "./interface";

export default class LighthouseExecutor extends Executor<ILHTarget, any> {
  protected async batchJob(config: ILHConfiguration, target: any) {
    const {lighthouseConfig, puppeteerConfig} = config;
    const browser = await puppeteer.launch(puppeteerConfig);
    const port = new URL(browser.wsEndpoint()).port;
    const opts: any = {port};
    const audits = await lighthouse(target.url, opts, lighthouseConfig);
    browser.close();
    return {...target, ...parseAudits(audits)};
  }
}
