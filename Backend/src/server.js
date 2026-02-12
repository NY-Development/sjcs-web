import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import { appConfig } from "./config/appConfig.js";
import logger from "./utils/logger.js";

const startServer = async () => {
  // Check Config
  if (!appConfig.mongoUri) {
    logger.error("CONFIG_ERROR: MONGO_URI is not set ❌");
    process.exit(1);
  }

  if (!appConfig.jwtSecret || !appConfig.jwtRefreshSecret) {
    logger.error("CONFIG_ERROR: JWT secrets are not set ❌");
    process.exit(1);
  }

  try {
    // Initial connection attempt
    await connectDB();

    // Start Listening
    app.listen(appConfig.port, () => {
      // Explicit Log for Port
      logger.info(`SERVER_STATUS: Online ✅ | LISTENING_ON_PORT: ${appConfig.port}`);
    });
  } catch (error) {
    logger.error(`FATAL_BOOT_ERROR: ${error.message} 💥`);
    process.exit(1);
  }
};

startServer();