import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const signup = async (req, res) => {
  const result = await authService.signup(req.body);
  return successResponse(res, result, "Signup successful", 201);
};

export const login = async (req, res) => {
  const result = await authService.login(req.body);
  return successResponse(res, result, "Login successful");
};

export const refresh = async (req, res) => {
  const token = req.body.refreshToken;
  const result = await authService.refresh(token);
  return successResponse(res, result, "Token refreshed");
};

export const logout = async (req, res) => {
  const token = req.body.refreshToken;
  await authService.logout(req.user.id, token);
  return successResponse(res, null, "Logged out");
};

