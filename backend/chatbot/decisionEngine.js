const { getCropPrediction, getDiseasePrediction } = require("./modelConnector");

async function decisionEngine(farmerData) {
  let advice = [];

  // 1. Crop prediction
  const cropResult = await getCropPrediction(farmerData.soil);
  advice.push(`🌱 Best crop for you: ${cropResult.crop}`);

  // 2. Disease prediction
  if (farmerData.image) {
    const diseaseResult = await getDiseasePrediction(farmerData.image);
    advice.push(`🦠 Disease detected: ${diseaseResult.disease}`);
    advice.push(`💊 Treatment: ${diseaseResult.treatment}`);
  }

  // 3. Weather logic
  if (farmerData.weather?.rain) {
    advice.push("🌧️ Do NOT irrigate today because rain is expected.");
  } else {
    advice.push("💧 Irrigate in the morning.");
  }

  // 4. Fertilizer logic
  if (farmerData.soil?.nitrogen < 40) {
    advice.push("🌾 Apply Urea fertilizer (40kg per acre).");
  }

  // 5. Water source logic
  if (farmerData.waterSource === "low") {
    advice.push("🚱 Choose low water crops like millet or sorghum.");
  }

  // 6. Budget logic
  if (farmerData.budget === "low") {
    advice.push("💰 Use organic fertilizer to save cost.");
  }

  return advice;
}

module.exports = decisionEngine;