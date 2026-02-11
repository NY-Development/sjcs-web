import express from "express";
import * as studentsController from "../controllers/students.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN, ROLES.TEACHER), studentsController.createStudent);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER), studentsController.listStudents);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT), studentsController.getStudent);
router.put("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), studentsController.updateStudent);
router.delete("/:id", authorize(ROLES.ADMIN), studentsController.deleteStudent);

export default router;
