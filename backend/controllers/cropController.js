  import axios from "axios";
  import { getWeather } from "../services/weatherService.js";

  export const predictCrop = async (req, res) => {
    try {
      const { lat, lon } = req.body;

    const weather = await getWeather(lat, lon);

console.log("Weather data:", weather);
console.log("lat:", lat, "lon:", lon);

      const soil = {
        N: 90,
        P: 40,
        K: 40,
        ph: 6.5,
        rainfall: 200,
      };

      //old api backend calling

  //  const ml = await axios.post("http://127.0.0.1:10000/crop/predict", {
  //   ...soil,
  //   temperature: weather.temperature,
  //   humidity: weather.humidity,
  // });

  const ml = await axios.post(
  "https://agrovision-ml-models.onrender.com/crop/predict",
  {
    ...soil,
    temperature: weather.temperature,
    humidity: weather.humidity
  },
  {
    timeout: 120000
  }
);

  console.log("Sending to ML:", {
  ...soil,
  temperature: weather.temperature,
  humidity: weather.humidity
});

if (!weather || !weather.temperature || !weather.humidity) {
  return res.status(500).json({ error: "Weather data not available" });
}


// const ml = await axios.post(
//   "https://agrovision-ml-models.onrender.com/crop/predict",
//   {
//     ...soil,
//     temperature: weather.temperature,
//     humidity: weather.humidity,
//   },
//   {
//     timeout: 120000
//   }
// );
      res.json({
        crop: ml.data.crop,
        reason: ml.data.reason,
        weather,
      });
    } catch (err) {
      console.log("ML ERROR:", err.response?.data || err.message);
      res.status(500).json({ error: "Prediction failed" });
    }
  };