import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [decisions, setDecisions] = useState([]);

  // Auth check
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

  // Dummy weather fetch (later replace with API)
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

  // Smart decision engine (frontend logic)
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      {/* Header */}
      <div className="bg-green-700 text-white p-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">🌱 AgroVision Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100"
          >
            ⬅ Back
          </button>

          <button
            onClick={handleLogout}
            className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">

        {/* Welcome */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-3xl font-bold text-green-700">
            Welcome, {user?.name || "Farmer"} 👨‍🌾
          </h2>
          <p className="text-gray-600 mt-2">
            Smart decisions based on today’s weather and crop conditions.
          </p>
        </div>

        {/* Weather Card */}
        {weather && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-blue-100 p-5 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-blue-700">☁ Weather</h3>
              <p>{weather.condition}, {weather.temp}°C</p>
              <p>Humidity: {weather.humidity}%</p>
            </div>

            <div className="bg-yellow-100 p-5 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-yellow-700">🧪 Fertilizer</h3>
              <p>Apply Nitrogen fertilizer tomorrow</p>
            </div>

            <div className="bg-red-100 p-5 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-red-700">🦠 Disease Risk</h3>
              <p>Medium (due to humidity)</p>
            </div>

          </div>
        )}

        {/* Smart Decisions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-green-700 mb-4">
            📊 Smart Farming Decisions (Today)
          </h3>

          <ul className="space-y-3 text-gray-700">
            {decisions.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-bold text-green-700 mb-4">🚀 Services</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div onClick={() => navigate("/crop-prediction")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow hover:scale-105 transition">
              🌾 Crop Prediction
            </div>

            <div onClick={() => navigate("/disease-detection")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow hover:scale-105 transition">
              🦠 Disease Detection
            </div>

            <div onClick={() => navigate("/weather")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow hover:scale-105 transition">
              ☁ Weather Forecast
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;