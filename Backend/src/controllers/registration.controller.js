import * as registrationService from "../services/registration.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const submitStepTwo = async (req, res) => {
  const submission = await registrationService.submitStepTwo(req.body);
  return successResponse(res, submission, "Registration submitted", 201);
};

export const getStatus = async (req, res) => {
  const status = await registrationService.getRegistrationStatus();
  return successResponse(res, status, "Registration status fetched");
};
