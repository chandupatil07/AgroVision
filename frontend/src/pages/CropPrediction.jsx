import React, { useState } from "react";
import axios from "axios";
import cropBg from "../assets/crop_pred_page.jpg";

function CropPrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const predict = () => {
    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setLoading(true);

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const res = await axios.post(
          "http://localhost:5000/api/crop/predict",
          // "https://agrovision-backend-ab1p.onrender.com/api/crop/predict",
          { lat, lon }
        );

//         const res = await axios.post(
// "https://agrovision-backend-ab1p.onrender.com/api/crop/predict",
// { lat, lon },
// { timeout: 60000 } // wait 60 seconds
// );

        setResult(res.data);
      } catch (err) {
        alert("Prediction failed");
      }

      setLoading(false);
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${cropBg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
          🌱 AgroVision Smart Crop Prediction
        </h1>

        {/* Main Card */}
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-xl mx-auto">
          
          <p className="text-gray-600 mb-6 text-lg">
            Detect your farm location and get AI-powered crop recommendations
            based on real-time weather conditions.
          </p>

          <button
            onClick={predict}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-semibold shadow-lg w-full"
          >
            {loading ? "Detecting..." : "📍 Use My Location"}
          </button>

          {/* Result Section */}
          {result && (
            <div className="mt-8 space-y-6 animate-fade-in">
              
              <div className="bg-green-100 p-5 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-green-700">
                  🌾 Recommended Crop
                </h2>
                <p className="text-xl font-semibold mt-2">
                  {result.crop}
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl shadow">
                <h3 className="text-lg font-semibold text-blue-700">
                  📘 Reason
                </h3>
                <p className="mt-2 text-gray-700">
                  {result.reason}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                  🌡 Temperature:{" "}
                  <span className="font-semibold">
               {result.weather.temperature}  °C
                  </span>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg shadow">
                  💧 Humidity:{" "}
                  <span className="font-semibold">
                {result.weather.humidity}%
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropPrediction;