import DataLoader from "dataloader";
import { SampleRepository } from "../repositories/sample";

const SampleDataLoader = new DataLoader(async (keys: readonly string[]) => {
  const results = await SampleRepository.findByIds(keys);
  return keys.map((key) => results[key] || new Error(`No result for ${key}`));
});

export { SampleDataLoader };
