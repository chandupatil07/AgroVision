// controllers/decisionController.js

const getDecision = async (req, res) => {
  try {
    const { temperature, humidity, rain, soilMoisture } = req.body;

    let decision = "";

    if (rain > 60) {
      decision = "Do not irrigate today. Rain expected.";
    } else if (soilMoisture < 30) {
      decision = "Irrigation required.";
    } else {
      decision = "No action needed today.";
    }

    res.json({
      success: true,
      decision
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getDecision };