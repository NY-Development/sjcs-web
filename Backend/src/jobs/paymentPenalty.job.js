import { applyOverduePenalties } from "../services/payment.service.js";
import logger from "../utils/logger.js";

export const runPaymentPenaltyJob = async () => {
  const results = await applyOverduePenalties({ rate: 0.05 });
  logger.info(`Payment penalty job ran. Updated: ${results.length}`);
  return results;
};
