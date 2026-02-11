import express from "express";
import * as studyHubController from "../controllers/studyHub.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/overview",
  authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT),
  studyHubController.getOverview
);

export default router;
