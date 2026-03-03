const axios = require("axios");

async function getCropPrediction(soilData) {
  try {
    const res = await axios.post("http://localhost:8000/predict", soilData);
    return res.data;
  } catch (err) {
    console.log("Crop model error:", err.message);
    return { crop: "Model not available" };
  }
}

async function getDiseasePrediction(imageData) {
  try {
    const res = await axios.post("http://localhost:6000/predict", imageData);
    return res.data;
  } catch (err) {
    console.log("Disease model error:", err.message);
    return { disease: "No disease detected", treatment: "N/A" };
  }
}

module.exports = {
  getCropPrediction,
  getDiseasePrediction
};