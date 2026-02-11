import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.get("/dashboard", authorize(ROLES.ADMIN), adminController.getDashboard);

export default router;
