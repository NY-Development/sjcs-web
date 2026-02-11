import * as studyHubService from "../services/studyHub.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getOverview = async (req, res) => {
  const overview = await studyHubService.getStudyHubOverview(req.user?.id);
  return successResponse(res, overview, "Study hub overview fetched");
};
