import mongoose from "mongoose";
import { appConfig } from "./appConfig.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(appConfig.mongoUri, {
      bufferTimeoutMS: 20000,
      serverSelectionTimeoutMS: 20000,
    });
    logger.info("MongoDB connected ✅");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
