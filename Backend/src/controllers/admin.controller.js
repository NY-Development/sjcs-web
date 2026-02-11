import * as adminService from "../services/admin.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getDashboard = async (req, res) => {
  const dashboard = await adminService.getAdminDashboard();
  return successResponse(res, dashboard, "Admin dashboard fetched");
};
