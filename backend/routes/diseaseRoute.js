import express from "express";
import { predictDisease } from "../controllers/diseaseController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/predict", upload.single("image"), predictDisease);

export default router;