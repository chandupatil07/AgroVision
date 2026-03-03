import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

        {/* Welcome + Profile */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-3xl font-bold text-green-800">
              Welcome, {user?.name || "Farmer"} 👨‍🌾
            </h2>
            <p className="text-gray-600 mt-2">
              Smart decisions based on today’s weather and crop conditions.
            </p>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold shadow">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">Farmer Account</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>

        </div>

        {/* Weather Cards */}
        {weather && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">☁ Weather</h3>
              <p className="text-gray-700">{weather.condition}, {weather.temp}°C</p>
              <p className="text-gray-700">Humidity: {weather.humidity}%</p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-yellow-700 mb-2">🧪 Fertilizer</h3>
              <p className="text-gray-700">Apply Nitrogen fertilizer tomorrow</p>
            </div>

            <div className="bg-red-100 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-red-700 mb-2">🦠 Disease Risk</h3>
              <p className="text-gray-700">Medium (due to humidity)</p>
            </div>

          </div>
        )}

        {/* Smart Decisions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6">
            📊 Smart Farming Decisions (Today)
          </h3>

          <ul className="space-y-3 text-gray-700">
            {decisions.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-600">✔</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-bold text-green-800 mb-6">
            🚀 Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div 
              onClick={() => navigate("/crop-prediction")}
              className="cursor-pointer bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition"
            >
              🌾 Crop Prediction
            </div>

            <div 
              onClick={() => navigate("/disease-detection")}
              className="cursor-pointer bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition"
            >
              🦠 Disease Detection
            </div>

            <div 
              onClick={() => navigate("/weather")}
              className="cursor-pointer bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition"
            >
              ☁ Weather Forecast
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;