import React, { useState } from "react";
import axios from "axios";
import weatherBg from "../assets/weather_pred_page.jpg";

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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${weatherBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
          🌤️ Weather & Farming Advisory
        </h1>

        {/* Search Section */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter city name"
            className="p-3 rounded-lg border w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button
            onClick={getWeather}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 w-full md:w-auto"
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>

          <button
            onClick={useMyFarmLocation}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full md:w-auto"
          >
            📍 Use My Farm Location
          </button>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-8 text-left space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-blue-600">
              📍 {weather.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
              <p className="bg-blue-50 p-4 rounded-lg shadow">
                🌡️ Temperature: <span className="font-semibold">{weather.main.temp} °C</span>
              </p>
              <p className="bg-green-50 p-4 rounded-lg shadow">
                💧 Humidity: <span className="font-semibold">{weather.main.humidity} %</span>
              </p>
              <p className="bg-yellow-50 p-4 rounded-lg shadow">
                🌬️ Wind Speed: <span className="font-semibold">{weather.wind.speed} m/s</span>
              </p>
              <p className="bg-purple-50 p-4 rounded-lg shadow">
                ☁️ Condition: <span className="font-semibold">{weather.weather[0].main}</span>
              </p>
            </div>

            <div className="bg-green-100 border-l-4 border-green-600 p-6 rounded-lg shadow">
              <h3 className="font-bold text-green-700 text-xl">
                🌱 Farming Advice
              </h3>
              <p className="mt-3 text-gray-700 text-lg">{advice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;