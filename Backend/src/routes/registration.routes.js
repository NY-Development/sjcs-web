import express from "express";
import * as registrationController from "../controllers/registration.controller.js";

const router = express.Router();

router.post("/step-2", registrationController.submitStepTwo);
router.get("/status", registrationController.getStatus);

export default router;
