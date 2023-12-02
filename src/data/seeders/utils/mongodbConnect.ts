import mongoose from "mongoose";
import { MONGODB } from "../../../../env";

const connectToMongoDB = async (): Promise<typeof mongoose> => {
  try {
    await mongoose.connect(MONGODB.URL, {
      dbName: MONGODB.DBNAME,
      ssl: MONGODB.USE_SSL,
    });

    mongoose.set("strictQuery", true);
    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const withMongoDBConnection =
  (script: () => Promise<void>) => async () => {
    try {
      const mongooseInstance = await connectToMongoDB();

      // Execute the provided script
      await script();

      await mongooseInstance.disconnect();
    } catch (error) {
      console.error("Error executing script:", error);
    }
  };
