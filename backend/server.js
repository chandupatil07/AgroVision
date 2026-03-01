import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDB from "./config/mongodb.js";
import authRoute from "./routes/authRoute.js";
import cropRoutes from "./routes/cropRoute.js";


dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/crop", cropRoutes);

// routes
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});