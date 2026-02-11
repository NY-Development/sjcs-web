import * as reportsService from "../services/reports.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getSummary = async (req, res) => {
  const summary = await reportsService.getReportsSummary();
  return successResponse(res, summary, "Reports summary fetched");
};

export const getList = async (req, res) => {
  const reports = await reportsService.getReportsList();
  return successResponse(res, reports, "Reports list fetched");
};
