import express from "express";
import * as financeController from "../controllers/finance.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.get("/overview", authorize(ROLES.ADMIN), financeController.getOverview);
router.get("/transactions", authorize(ROLES.ADMIN), financeController.getTransactions);

export default router;
