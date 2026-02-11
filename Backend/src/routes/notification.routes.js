import express from "express";
import * as notificationsController from "../controllers/notifications.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN, ROLES.TEACHER), notificationsController.createNotification);
router.get(
	"/preferences",
	authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT),
	notificationsController.getPreferences
);
router.put(
	"/preferences",
	authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT),
	notificationsController.updatePreferences
);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT), notificationsController.listNotifications);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT), notificationsController.getNotification);
router.put("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), notificationsController.updateNotification);
router.delete("/:id", authorize(ROLES.ADMIN), notificationsController.deleteNotification);

export default router;
