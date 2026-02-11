import express from "express";
import * as reportsController from "../controllers/reports.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.get("/summary", authorize(ROLES.ADMIN), reportsController.getSummary);
router.get("/list", authorize(ROLES.ADMIN), reportsController.getList);

export default router;
