"use server";
import { Db, MongoClient } from "mongodb";
const mongoDbFullUrl = process.env.MONGO_DB_URl! + process.env.MONGO_DB_NAME!;
const dbName = process.env.MONGO_DB_NAME!;
const client = new MongoClient(mongoDbFullUrl);

export async function DbConnection(): Promise<Db> {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    return client.db(dbName);
  } catch (error) {
    throw error;
  }
}
