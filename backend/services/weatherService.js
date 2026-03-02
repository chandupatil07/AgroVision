import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getWeather = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY;

  console.log("Lat:", lat, "Lon:", lon);//added newly to debug
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );

  return {
    temperature: res.data.main.temp,
    humidity: res.data.main.humidity,
  };
};