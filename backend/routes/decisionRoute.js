import express from "express";
import { getDecision } from "../controllers/decisionController.js";

const router = express.Router();

router.post("/", getDecision);

export default router;