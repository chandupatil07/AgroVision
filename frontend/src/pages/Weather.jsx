import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // 🌤️ Get Weather by City
  const getWeather = async () => {
    const cleanCity = city.trim();

    if (!cleanCity) {
      alert("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setWeather(null);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
      generateAdvice(res.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  // 📍 Get Weather by Farm Location (GPS)
  const getWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setWeather(null);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
      generateAdvice(res.data);
    } catch (error) {
      alert("Unable to fetch weather for this location");
    } finally {
      setLoading(false);
    }
  };

  // 📍 Use My Farm Location
  const useMyFarmLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  // 🌱 Farming Advice
  const generateAdvice = (data) => {
    const condition = data.weather[0].main;
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    let msg = "";

    if (condition === "Rain" || condition === "Thunderstorm") {
      msg = "🌧️ Rain expected. Do NOT water crops today.";
    } else if (temp > 35) {
      msg = "☀️ Very hot day. Water crops early morning or evening.";
    } else if (humidity > 80) {
      msg = "💧 High humidity. Risk of fungal disease.";
    } else {
      msg = "✅ Weather is suitable for normal farming activities.";
    }

    setAdvice(msg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌤️ Weather & Farming Advisory
      </h1>

      {/* Search */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          className="p-3 rounded-lg border w-64"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          onClick={getWeather}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>

        <button
          onClick={useMyFarmLocation}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          📍 Use My Farm Location
        </button>
      </div>

      {/* Weather Display */}
      {weather && (
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            📍 {weather.name}
          </h2>

          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p>🌡️ Temperature: {weather.main.temp} °C</p>
            <p>💧 Humidity: {weather.main.humidity} %</p>
            <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
            <p>☁️ Condition: {weather.weather[0].main}</p>
          </div>

          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
            <h3 className="font-bold text-green-700">🌱 Farming Advice</h3>
            <p className="mt-2 text-gray-700">{advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;