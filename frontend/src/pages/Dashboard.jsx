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
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">🌱 AgroVision Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          Welcome, {user?.name || "Farmer"} 👨‍🌾
        </h2>
        <p className="text-gray-600 mb-6">
          Choose a service below to get smart agriculture insights.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Crop Prediction */}
          <div
            onClick={() => navigate("/crop-prediction")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-bold text-green-700 mb-2">
              🌾 Crop Prediction
            </h3>
            <p className="text-gray-600">
              Predict the best crop based on soil and climate data.
            </p>
          </div>

          {/* Disease Detection */}
          <div
            onClick={() => navigate("/disease-detection")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-bold text-green-700 mb-2">
              🦠 Disease Detection
            </h3>
            <p className="text-gray-600">
              Upload plant image and detect crop diseases instantly.
            </p>
          </div>

          {/* Deficiency Detection */}
          <div
            onClick={() => navigate("/deficiency-detection")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-bold text-green-700 mb-2">
              🧪 Deficiency Detection
            </h3>
            <p className="text-gray-600">
              Identify nutrient deficiency from plant leaf images.
            </p>
          </div>

          {/* Weather */}
          <div
            onClick={() => navigate("/weather")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-bold text-green-700 mb-2">
              ☁️ Weather Forecast
            </h3>
            <p className="text-gray-600">
              Get live weather updates for your farming location.
            </p>
          </div>

          {/* Recommendation */}
          <div
            onClick={() => navigate("/recommendation")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-bold text-green-700 mb-2">
              📊 Recommendation
            </h3>
            <p className="text-gray-600">
              Get smart fertilizer and crop care recommendations.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;