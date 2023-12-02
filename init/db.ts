import mongoose, { Connection } from "mongoose";
import { MONGODB } from "../env";

export const dbInitializer = async (): Promise<Connection> => {
  mongoose.connect(MONGODB.URL, {
    dbName: MONGODB.DBNAME,
    ssl: MONGODB.USE_SSL,
  });

  const mongoDbConnection = mongoose.connection;

  mongoDbConnection.on("error", (err) => {
    console.error(err);
  });
  mongoDbConnection.on("connected", (err, res) => {
    console.log("Connected to MongoDB");
  });

  return mongoDbConnection;
};
