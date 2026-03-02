import express from "express";

import { predictCrop } from "../controllers/cropController.js";


const router = express.Router();

/*
 POST: /api/crop/recommend
 Body: { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall }
*/

router.post("/predict", predictCrop);


export default router;