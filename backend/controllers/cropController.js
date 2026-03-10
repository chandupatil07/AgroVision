import axios from "axios";
import { getWeather } from "../services/weatherService.js";

export const predictCrop = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    const weather = await getWeather(lat, lon);

    console.log(weather);//added newly to debug
    // Dummy soil values
    const soil = {
      N: 90,
      P: 40,
      K: 40,
      ph: 6.5,
      rainfall: 200,
    };

    // const ml = await axios.post("http://127.0.0.1:8000/predict", {
    //   ...soil,
    //   temperature: weather.temperature,
    //   humidity: weather.humidity,
    // });   //old api backend calling

      const ml = await axios.post("http://127.0.0.1:10000/crop/predict", {
      ...soil,
      temperature: weather.temperature,
      humidity: weather.humidity,
    });

    res.json({
      crop: ml.data.crop,
      reason: ml.data.reason,
      weather,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
};