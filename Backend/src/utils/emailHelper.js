import logger from "./logger.js";

export const sendEmail = async ({ to, subject, text }) => {
  logger.info(`Email queued to ${to}: ${subject}`);
  return { to, subject, text };
};
