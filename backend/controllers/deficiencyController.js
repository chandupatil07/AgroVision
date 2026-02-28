import Deficiency from "../models/deficiencyModel.js";

export const predictDeficiency = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const image = req.file.filename;
    const result = "Nitrogen Deficiency"; // temporary

    const deficiency = new Deficiency({
      image,
      result,
    });

    await deficiency.save();

    res.status(200).json({
      success: true,
      message: "Deficiency predicted successfully",
      result,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};