import express from "express";
import * as attendanceController from "../controllers/attendance.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN, ROLES.TEACHER), attendanceController.createAttendance);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER), attendanceController.listAttendance);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT), attendanceController.getAttendance);
router.put("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), attendanceController.updateAttendance);
router.delete("/:id", authorize(ROLES.ADMIN), attendanceController.deleteAttendance);

export default router;
