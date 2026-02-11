import express from "express";
import * as profileController from "../controllers/profile.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/me",
  authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT),
  profileController.getMe
);

export default router;
