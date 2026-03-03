const decisionEngine = require("./decisionEngine");

exports.chatbotReply = async (req, res) => {
  try {
    const { farmerData } = req.body;

    const reply = await decisionEngine(farmerData);

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Chatbot failed" });
  }
};