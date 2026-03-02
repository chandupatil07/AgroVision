import React, { useState } from "react";
import axios from "axios";

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
          { lat, lon }
        );

        setResult(res.data);
      } catch (err) {
        alert("Prediction failed");
      }

      setLoading(false);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e8f5e9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2>🌱 AgroVision Smart Farming</h2>

        <button
          onClick={predict}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Detecting..." : "Use My Location"}
        </button>

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h3>Recommended Crop: {result.crop}</h3>
            <p>{result.reason}</p>
            <p>🌡 Temp: {result.weather.temperature} °C</p>
            <p>💧 Humidity: {result.weather.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropPrediction;