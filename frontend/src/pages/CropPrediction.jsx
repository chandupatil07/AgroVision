import React, { useEffect, useState } from "react";
import axios from "axios";

function CropPrediction() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [result, setResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          fetchPrediction(lat, lon);
        },
        () => alert("Location permission denied")
      );
    }
  };

  const fetchPrediction = async (lat, lon) => {
    try {
      const res = await axios.post("http://localhost:5000/api/crop/auto-predict", {
        lat,
        lon,
      });

      setWeather(res.data.weather);
      setResult(res.data.crop);
      setAdvice(res.data.advice);
      setLoading(false);
    } catch (error) {
      alert("Prediction failed");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        🌍 Detecting location & analyzing farm data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">

      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌾 Smart Crop Prediction (Auto Mode)
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-6">

        {/* Weather Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-100 rounded-lg">
            🌡 Temp: {weather.temp} °C
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            💧 Humidity: {weather.humidity} %
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg">
            ☔ Rainfall: {weather.rainfall} mm
          </div>
        </div>

        {/* Crop Result */}
        <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
          <h2 className="text-xl font-bold text-green-700">
            ✅ Recommended Crop
          </h2>
          <p className="text-2xl mt-2">🌱 {result}</p>
        </div>

        {/* Smart Advice */}
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
          <h2 className="text-xl font-bold text-orange-700">
            🧠 Smart Farming Advice
          </h2>
          <p className="mt-2">{advice}</p>
        </div>

      </div>
    </div>
  );
}

export default CropPrediction;