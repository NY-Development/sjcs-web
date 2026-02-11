import express from "express";
import * as subjectsController from "../controllers/subjects.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN, ROLES.TEACHER), subjectsController.createSubject);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER), subjectsController.listSubjects);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), subjectsController.getSubject);
router.put("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), subjectsController.updateSubject);
router.delete("/:id", authorize(ROLES.ADMIN), subjectsController.deleteSubject);

export default router;
