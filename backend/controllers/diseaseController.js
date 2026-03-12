import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const predictDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));

    // const response = await axios.post(
    //   // "http://127.0.0.1:6000/predict",
    //   "http://127.0.0.1:10000/disease/predict", //this new changed 
    //   formData,
    //   { headers: formData.getHeaders() }
    // ); //api backend is calling old
const response = await axios.post(
 "https://agrovision-ml-models.onrender.com/disease/predict",
 formData,
 {
   headers: formData.getHeaders(),
   timeout: 300000
 }
);

fs.unlinkSync(req.file.path);
    return res.json(response.data);

  } catch (error) {
    console.log("ML Error:", error.response?.data || error.message);
    return res.status(500).json({ message: "ML server error" });
  }
};