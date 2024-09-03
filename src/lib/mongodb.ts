import mongoose from "mongoose";
import { env } from "process";

export function connectMongoDB() {
  const mongoUri: string = process.env.MONGODB_URI as string;
  try {
    mongoose.connect(mongoUri);
    console.log("Connect");
  } catch (err) {
    console.log(err);
  }
}
