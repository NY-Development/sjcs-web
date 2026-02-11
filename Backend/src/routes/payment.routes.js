import express from "express";
import * as paymentsController from "../controllers/payments.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize(ROLES.ADMIN), paymentsController.createPayment);
router.get("/", authorize(ROLES.ADMIN, ROLES.TEACHER), paymentsController.listPayments);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.TEACHER), paymentsController.getPayment);
router.put("/:id", authorize(ROLES.ADMIN), paymentsController.updatePayment);
router.delete("/:id", authorize(ROLES.ADMIN), paymentsController.deletePayment);
router.post("/:id/mark-paid", authorize(ROLES.ADMIN), paymentsController.markPaid);

export default router;
