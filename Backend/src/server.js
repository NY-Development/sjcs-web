import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import { appConfig } from "./config/appConfig.js";
import logger from "./utils/logger.js";

const startServer = async () => {
  if (!appConfig.mongoUri) {
    logger.error("MONGO_URI is not set");
    process.exit(1);
  }

  if (!appConfig.jwtSecret || !appConfig.jwtRefreshSecret) {
    logger.error("JWT secrets are not set");
    process.exit(1);
  }

  await connectDB();

  app.listen(appConfig.port, () => {
    logger.info(`Server running on port ${appConfig.port}`);
  });
};

startServer();
