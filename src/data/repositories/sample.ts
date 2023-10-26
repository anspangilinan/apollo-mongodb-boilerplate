import { Sample } from "../models/sample";

class SampleRepository {
  static async find(filters) {
    return Sample.find(filters);
  }

  static async findByIds(ids: readonly string[]) {
    return Sample.find({ _id: { $in: ids } });
  }
}

export { SampleRepository };
