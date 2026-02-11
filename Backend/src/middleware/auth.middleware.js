import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig.js";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.substring(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Missing token" });
  }

  try {
    const payload = jwt.verify(token, appConfig.jwtSecret);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  return next();
};

