import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { appConfig } from "../config/appConfig.js";

const signAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, appConfig.jwtSecret, {
    expiresIn: appConfig.jwtExpiration
  });

const signRefreshToken = (user) =>
  jwt.sign({ id: user._id }, appConfig.jwtRefreshSecret, {
    expiresIn: appConfig.jwtRefreshExpiration
  });

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const signup = async (payload) => {
  const user = await User.create(payload);
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshTokens.push(hashToken(refreshToken));
  await user.save();

  return { user, accessToken, refreshToken };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshTokens.push(hashToken(refreshToken));
  await user.save();

  return { user, accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) {
    const error = new Error("Missing refresh token");
    error.status = 401;
    throw error;
  }

  let payload;
  try {
    payload = jwt.verify(token, appConfig.jwtRefreshSecret);
  } catch (error) {
    const err = new Error("Invalid refresh token");
    err.status = 401;
    throw err;
  }

  const user = await User.findById(payload.id);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const tokenHash = hashToken(token);
  if (!user.refreshTokens.includes(tokenHash)) {
    const error = new Error("Refresh token revoked");
    error.status = 401;
    throw error;
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshTokens = user.refreshTokens.filter((t) => t !== tokenHash);
  user.refreshTokens.push(hashToken(refreshToken));
  await user.save();

  return { accessToken, refreshToken };
};

const logout = async (userId, token) => {
  if (!token) {
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    return;
  }

  const tokenHash = hashToken(token);
  user.refreshTokens = user.refreshTokens.filter((t) => t !== tokenHash);
  await user.save();
};

export { signup, login, refresh, logout };
