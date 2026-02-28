// Crop Recommendation Controller

export const recommendCrop = async (req, res) => {
  try {
    const {
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall
    } = req.body;

    // Validation
    if (
      !nitrogen || !phosphorus || !potassium ||
      !temperature || !humidity || !ph || !rainfall
    ) {
      return res.status(400).json({
        success: false,
        message: "All soil and weather fields are required"
      });
    }

    // TEMP logic (later connect ML API)
    let crop = "Rice";

    if (ph > 6 && rainfall < 100) crop = "Wheat";
    if (temperature > 30) crop = "Cotton";

    res.status(200).json({
      success: true,
      recommendedCrop: crop
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Crop recommendation failed",
      error: error.message
    });
  }
};