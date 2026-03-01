import React, { useState } from "react";
import axios from "axios";

function CropPrediction() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const predictCrop = async () => {
    try {
      setLoading(true);

const res = await axios.post(
  "http://localhost:5000/api/crop/recommend",
  formData
);

     setResult(res.data.recommendedCrop);
      setLoading(false);
    } catch (error) {
      alert("Prediction failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">

      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌾 Crop Prediction System
      </h1>

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Enter Soil & Climate Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input type="number" name="nitrogen" placeholder="Nitrogen (N)" className="input" onChange={handleChange} />
          <input type="number" name="phosphorus" placeholder="Phosphorus (P)" className="input" onChange={handleChange} />
          <input type="number" name="potassium" placeholder="Potassium (K)" className="input" onChange={handleChange} />

          <input type="number" name="temperature" placeholder="Temperature (°C)" className="input" onChange={handleChange} />
          <input type="number" name="humidity" placeholder="Humidity (%)" className="input" onChange={handleChange} />
          <input type="number" name="ph" placeholder="Soil pH" className="input" onChange={handleChange} />

          <input type="number" name="rainfall" placeholder="Rainfall (mm)" className="input" onChange={handleChange} />
        </div>

        <button
          onClick={predictCrop}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Predicting..." : "Predict Crop"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-green-100 border-l-4 border-green-600 p-4 rounded">
            <h3 className="text-lg font-bold text-green-700">
              ✅ Best Crop Recommendation
            </h3>
            <p className="text-xl mt-2 text-gray-800">
              🌱 {result}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default CropPrediction;