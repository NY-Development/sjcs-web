import * as settingsService from "../services/settings.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getSecuritySettings = async (req, res) => {
  const security = await settingsService.getSecuritySettings();
  return successResponse(res, security, "Security settings fetched");
};
