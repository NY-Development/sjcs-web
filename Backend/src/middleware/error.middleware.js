import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  logger.error(err);
  res.status(status).json({ success: false, message });
};

