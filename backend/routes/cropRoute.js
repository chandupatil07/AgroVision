import express from "express";
import { recommendCrop } from "../controllers/cropController.js";

const router = express.Router();

/*
 POST: /api/crop/recommend
 Body: { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall }
*/
router.post("/recommend", recommendCrop);

export default router;