import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

import authRoute from "./routes/authRoute.js";
import cropRoute from "./routes/cropRoute.js";
import diseaseRoute from "./routes/diseaseRoute.js";
import deficiencyRoute from "./routes/deficiencyRoute.js";
import weatherRoute from "./routes/weatherRoute.js";
import decisionRoute from "./routes/decisionRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/crop", cropRoute);
app.use("/api/disease", diseaseRoute);
app.use("/api/deficiency", deficiencyRoute);
app.use("/api/weather", weatherRoute);
app.use("/api/decision", decisionRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});