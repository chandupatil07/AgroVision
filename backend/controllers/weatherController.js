import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const city = req.params.city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Weather API error" });
  }
};