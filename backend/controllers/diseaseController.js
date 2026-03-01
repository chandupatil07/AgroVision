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

    const response = await axios.post(
      "http://127.0.0.1:6000/predict",
      formData,
      { headers: formData.getHeaders() }
    );

    return res.json(response.data);

  } catch (error) {
    console.log("ML Error:", error.message);
    return res.status(500).json({ message: "ML server error" });
  }
};