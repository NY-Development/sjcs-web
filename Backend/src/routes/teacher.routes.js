import express from "express";
import * as teachersController from "../controllers/teachers.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN), teachersController.createTeacher);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER), teachersController.listTeachers);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), teachersController.getTeacher);
router.put("/:id", authorize(ROLES.ADMIN), teachersController.updateTeacher);
router.delete("/:id", authorize(ROLES.ADMIN), teachersController.deleteTeacher);

export default router;
