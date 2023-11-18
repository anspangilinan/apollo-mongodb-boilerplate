import { Model } from "mongoose";

export interface IMongooseRepository<T> {
  populateCollections: string[];

  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByIds(ids: readonly string[]): Promise<T[]>;
  findAll(): Promise<T[]>;
  updateById(id: string, data: Partial<T>): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
}

/**
 * MongooseRepository class provides a generic implementation of a MongoDB repository using Mongoose.
 * It supports basic CRUD operations and dynamic population of specified collections.
 *
 * @template T - The type of the Mongoose model document.
 */
export class MongooseRepository<T> implements IMongooseRepository<T> {
  /**
   * The Mongoose model associated with this repository.
   */
  private model: Model<T>;

  /**
   * The array of collection names to be populated during queries.
   */
  populateCollections: string[];

  /**
   * Constructs a new instance of MongooseRepository.
   *
   * @param {Model<T>} model - The Mongoose model associated with this repository.
   * @param {string[]} [populateCollections=[]] - The array of collection names to be populated during queries.
   */
  constructor(model: Model<T>, populateCollections: string[] = []) {
    this.model = model;
    this.populateCollections = populateCollections;
  }

  /**
   * Applies dynamic population to a Mongoose query based on the specified collections.
   *
   * @param {any} query - The Mongoose query to which population should be applied.
   * @returns {any} - The modified Mongoose query with population applied.
   * @private
   */
  private applyPopulate(query: any): any {
    if (this.populateCollections.length > 0) {
      this.populateCollections.forEach((field) => {
        query = query.populate(field);
      });
    }
    return query;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    let query = this.model.findById(id);
    query = this.applyPopulate(query);
    return query.exec();
  }

  async findByIds(ids: readonly string[]): Promise<T[]> {
    let query = this.model.find({ _id: ids });
    query = this.applyPopulate(query);
    return query.exec();
  }

  async findAll(): Promise<T[]> {
    let query = this.model.find();
    query = this.applyPopulate(query);
    return query.exec();
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    let query = this.model.findByIdAndUpdate(id, data, { new: true });
    query = this.applyPopulate(query);
    return query.exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
