import DataLoader from "dataloader";
import { MongooseRepository } from "../../repositories/base";

/**
 * Factory function to create a DataLoader for a specific MongooseRepository.
 * @param {MongooseRepository<T>} repository - The mongoose repository to be used for data loading.
 * @returns {DataLoader<string, T>} - The DataLoader instance.
 * @template T
 */
export const createDataLoader = <T>(
  repository: MongooseRepository<T>
): DataLoader<string, T> => {
  return new DataLoader(async (keys: readonly string[]) => {
    return repository.findByIds(keys);
  });
};
