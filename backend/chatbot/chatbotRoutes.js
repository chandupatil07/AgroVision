const express = require("express");
const router = express.Router();
const { chatbotReply } = require("./chatbotController");

router.post("/chat", chatbotReply);

module.exports = router;