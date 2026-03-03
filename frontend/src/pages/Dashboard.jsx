import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardBg from "../assets/dashboard_background.jpg";

// NEW CARD IMAGES
import cropCard from "../assets/crop_pred_card.jpg";
import diseaseCard from "../assets/disease_detection_card.avif";
import weatherCard from "../assets/weather_card_bg.png";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
      fetchWeather();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchWeather = async () => {
    const mockWeather = {
      temp: 28,
      condition: "Rainy",
      rain: true,
      humidity: 80,
    };
    setWeather(mockWeather);
    generateDecisions(mockWeather);
  };

  const generateDecisions = (weatherData) => {
    let actions = [];

    if (weatherData.rain) {
      actions.push("❌ Do NOT irrigate today (Rain expected)");
      actions.push("⚠️ High chance of fungal disease");
    } else {
      actions.push("✅ Light irrigation recommended");
    }

    if (weatherData.humidity > 70) {
      actions.push("🦠 Spray pesticide in evening (5PM - 6PM)");
    }

    actions.push("🌱 Apply nitrogen fertilizer tomorrow morning");
    actions.push("💰 Cost saving tip: Avoid fertilizer today due to rain");

    setDecisions(actions);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Welcome Section */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>
            <h2 className="text-4xl font-bold text-green-800">
              Welcome, {user?.name || "Farmer"} 👨‍🌾
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Smart AI-powered decisions based on today’s weather and crop conditions.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-bold shadow-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-lg">{user?.name}</p>
              <p className="text-sm text-gray-500">Farmer Account</p>
            </div>

            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-500 transition duration-300 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* SERVICES SECTION - IMPROVED */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-10 text-center">
            🚀 Explore Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* Crop Prediction Card */}
            <div
              onClick={() => navigate("/crop-prediction")}
              className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:scale-105"
            >
              <img
                src={cropCard}
                alt="Crop Prediction"
                className="w-full h-80 object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition duration-500"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
                <h4 className="text-2xl font-bold mb-3 tracking-wide">
                  🌾 Crop Prediction
                </h4>
                <p className="opacity-90 text-sm">
                  Get AI-based crop yield prediction using soil & weather data.
                </p>
              </div>
            </div>

            {/* Disease Detection Card */}
            <div
              onClick={() => navigate("/disease-detection")}
              className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:scale-105"
            >
              <img
                src={diseaseCard}
                alt="Disease Detection"
                className="w-full h-80 object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition duration-500"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
                <h4 className="text-2xl font-bold mb-3 tracking-wide">
                  🦠 Disease Detection
                </h4>
                <p className="opacity-90 text-sm">
                  Upload crop images to detect plant diseases instantly.
                </p>
              </div>
            </div>

            {/* Weather Forecast Card */}
            <div
              onClick={() => navigate("/weather")}
              className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl transform transition duration-500 hover:-translate-y-4 hover:scale-105"
            >
              <img
                src={weatherCard}
                alt="Weather Forecast"
                className="w-full h-80 object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition duration-500"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
                <h4 className="text-2xl font-bold mb-3 tracking-wide">
                  ☁ Weather Forecast
                </h4>
                <p className="opacity-90 text-sm">
                  Check real-time weather updates & farming recommendations.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;