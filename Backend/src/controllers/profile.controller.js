import * as profileService from "../services/profile.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getMe = async (req, res) => {
  const profile = await profileService.getProfile(req.user?.id);
  return successResponse(res, profile, "Profile fetched");
};
