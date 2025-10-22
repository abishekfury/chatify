import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB connected successfully", conn.connection.host);
  } catch (error) {
    console.error("MONGODB connection failed", error);
    process.exit(1);
  }
};
