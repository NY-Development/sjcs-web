import express from "express";
import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";
import teacherRoutes from "./teacher.routes.js";
import classRoutes from "./class.routes.js";
import subjectRoutes from "./subject.routes.js";
import gradeRoutes from "./grade.routes.js";
import paymentRoutes from "./payment.routes.js";
import attendanceRoutes from "./attendance.routes.js";
import notificationRoutes from "./notification.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);
router.use("/classes", classRoutes);
router.use("/subjects", subjectRoutes);
router.use("/grades", gradeRoutes);
router.use("/payments", paymentRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/notifications", notificationRoutes);

export default router;
