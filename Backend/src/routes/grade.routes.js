import express from "express";
import * as gradesController from "../controllers/grades.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN, ROLES.TEACHER), gradesController.createGrade);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER), gradesController.listGrades);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT), gradesController.getGrade);
router.put("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), gradesController.updateGrade);
router.delete("/:id", authorize(ROLES.ADMIN), gradesController.deleteGrade);

export default router;
