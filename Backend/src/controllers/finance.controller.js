import * as financeService from "../services/finance.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getOverview = async (req, res) => {
  const overview = await financeService.getFinanceOverview();
  return successResponse(res, overview, "Finance overview fetched");
};

export const getTransactions = async (req, res) => {
  const transactions = await financeService.getFinanceTransactions();
  return successResponse(res, transactions, "Finance transactions fetched");
};
