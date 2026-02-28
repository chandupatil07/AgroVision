import express from "express";
import { predictDeficiency } from "../controllers/deficiencyController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// POST: /api/deficiency/predict
router.post("/predict", upload.single("image"), predictDeficiency);

export default router;