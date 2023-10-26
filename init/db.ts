import mongoose from "mongoose";
import { MONGODB } from "../env";

export const dbInitializer = async () => {
  mongoose.connect(MONGODB.URL, {
    dbName: MONGODB.DBNAME,
    ssl: MONGODB.USE_SSL,
    sslValidate: MONGODB.USE_SSL,
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error(err);
  });
  db.on("connected", (err, res) => {
    console.log("Connected to MongoDB");
  });

  return db;
};
