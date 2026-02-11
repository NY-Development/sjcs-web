import express from "express";
import * as settingsController from "../controllers/settings.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/security",
  authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT),
  settingsController.getSecuritySettings
);

export default router;
