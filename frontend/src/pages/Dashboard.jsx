import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      {/* Header */}
      <div className="bg-green-700 text-white p-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">🌱 AgroVision Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6 space-y-8">

        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
          <h2 className="text-3xl font-bold text-green-700">
            Welcome, {user?.name || "Farmer"} 👨‍🌾
          </h2>
          <p className="text-gray-600 mt-2">
            Here are today’s smart farming insights for your field.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-blue-100 p-5 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-lg font-semibold text-blue-700">☁️ Weather Today</h3>
            <p className="text-gray-700 mt-2">Cloudy, 28°C</p>
            <p className="text-sm text-blue-600 mt-1">
              🌧️ Rain expected — Avoid irrigation today
            </p>
          </div>

          <div className="bg-yellow-100 p-5 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-lg font-semibold text-yellow-700">🧪 Soil Nutrition</h3>
            <p className="text-gray-700 mt-2">Nitrogen: Low</p>
            <p className="text-sm text-yellow-600 mt-1">
              ⚠️ Apply urea fertilizer today
            </p>
          </div>

          <div className="bg-red-100 p-5 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-lg font-semibold text-red-700">🦠 Crop Health</h3>
            <p className="text-gray-700 mt-2">Risk of Leaf Disease</p>
            <p className="text-sm text-red-600 mt-1">
              🚨 Spray pesticide in the evening
            </p>
          </div>

        </div>

        {/* Smart Decisions Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-green-700 mb-4">
            📊 Smart Farming Decisions (Today)
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>✅ Do NOT water crops today due to rainfall forecast.</li>
            <li>🌱 Apply nitrogen fertilizer in the morning.</li>
            <li>🦠 Monitor leaves for fungal infection.</li>
            <li>☀️ Best time to spray pesticide: 5:00 PM – 6:00 PM</li>
            <li>📈 Yield prediction: Good harvest expected.</li>
          </ul>
        </div>

        {/* Feature Cards */}
        <div>
          <h3 className="text-2xl font-bold text-green-700 mb-4">
            🚀 Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/crop-prediction")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">🌾 Crop Prediction</h3>
              <p className="text-gray-600">Predict the best crop for your soil and weather.</p>
            </div>

            <div
              onClick={() => navigate("/disease-detection")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">🦠 Disease Detection</h3>
              <p className="text-gray-600">Upload plant image and detect diseases.</p>
            </div>

            <div
              onClick={() => navigate("/deficiency-detection")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">🧪 Deficiency Detection</h3>
              <p className="text-gray-600">Check nutrient deficiency using leaf image.</p>
            </div>

            <div
              onClick={() => navigate("/weather")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">☁️ Weather Forecast</h3>
              <p className="text-gray-600">Live weather updates for your location.</p>
            </div>

            <div
              onClick={() => navigate("/recommendation")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">📊 Recommendations</h3>
              <p className="text-gray-600">Smart fertilizer & crop care suggestions.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;