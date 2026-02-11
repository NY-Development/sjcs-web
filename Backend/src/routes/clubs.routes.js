import express from "express";
import * as clubsController from "../controllers/clubs.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT), clubsController.listClubs);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT), clubsController.getClub);
router.get(
  "/:id/announcements",
  authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT),
  clubsController.getAnnouncements
);

export default router;
