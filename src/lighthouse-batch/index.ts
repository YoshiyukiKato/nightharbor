import {Batch} from "../batch";
import {normalizeConfig} from "./config/normalizer";
import LighthouseExecutor from "./executor";
import {ILHConfiguration, ILHTarget} from "./interface";

export async function exec(lhConfig: ILHConfiguration) {
  const config = normalizeConfig(lhConfig);
  const executor = new LighthouseExecutor();
  const batch = new Batch<ILHTarget, any>(executor);
  return await batch.execute(config);
}
