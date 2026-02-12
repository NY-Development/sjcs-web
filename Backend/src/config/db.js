import mongoose from "mongoose";
import { appConfig } from "./appConfig.js";
import logger from "../utils/logger.js";

// Cache the connection state
let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If already connected, skip
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  try {
    // Disable buffering: Queries will fail immediately if not connected
    // instead of waiting 20,000ms.
    mongoose.set("bufferCommands", false);

    const db = await mongoose.connect(appConfig.mongoUri, {
      serverSelectionTimeoutMS: 5000, // Fail fast if IP is blocked
    });

    isConnected = !!db.connections[0].readyState;
    
    // Explicit Log for DB Connection
    logger.info(`DATABASE_CONNECTED: ${isConnected} ✅`);
  } catch (error) {
    logger.error(`DATABASE_CONNECTION_ERROR: ${error.message} ❌`);
    isConnected = false;
    throw error; // Propagate to middleware
  }
};

export default connectDB;