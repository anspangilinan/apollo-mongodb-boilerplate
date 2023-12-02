import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";
import { afterAll, afterEach, beforeAll } from "vitest";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  await clearAllCollections();
});

async function clearAllCollections(): Promise<void> {
  const collections = mongoose.connection.collections;

  for (const collectionName in collections) {
    if (collections.hasOwnProperty(collectionName)) {
      try {
        await mongoose.connection.collection(collectionName).deleteMany({});
      } catch (error) {}
    }
  }
}
