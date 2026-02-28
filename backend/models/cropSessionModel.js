import mongoose from "mongoose";

const cropSessionSchema = new mongoose.Schema({
  userId: String,
  crop: String,
  soilType: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("CropSession", cropSessionSchema);