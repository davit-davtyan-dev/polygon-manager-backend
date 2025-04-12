import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectTestDb() {
  try {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
    console.log("Connected to the TEST DB");
  } catch (err) {
    console.error("Failed to connect to the TEST DB");
    console.error(err);
  }
}
