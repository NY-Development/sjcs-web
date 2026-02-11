import express from "express";
import * as classesController from "../controllers/classes.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN), classesController.createClass);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER), classesController.listClasses);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), classesController.getClass);
router.put("/:id", authorize(ROLES.ADMIN), classesController.updateClass);
router.delete("/:id", authorize(ROLES.ADMIN), classesController.deleteClass);

export default router;
