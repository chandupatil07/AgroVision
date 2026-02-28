import Disease from "../models/diseaseModel.js";

// Predict plant disease from uploaded image
export const predictDisease = async (req, res) => {
  try {
    // check if image uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const image = req.file.filename;

    // TODO: Send image to ML Flask API later
    // Example: axios.post(ML_API_URL, image)

    const result = "Healthy Leaf"; // temporary result

    const disease = new Disease({
      image,
      result,
    });

    await disease.save();

    res.status(200).json({
      success: true,
      message: "Disease predicted successfully",
      result: result,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};