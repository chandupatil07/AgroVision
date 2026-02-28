import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
  image: String,
  result: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Disease", diseaseSchema);