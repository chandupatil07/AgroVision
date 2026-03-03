import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const farmerData = {
    soil: { nitrogen: 30, phosphorus: 20, potassium: 25, ph: 6.5 },
    weather: { rain: true },
    waterSource: "low",
    budget: "medium",
    image: null
  };

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:5000/api/chatbot/chat", {
      message,
      farmerData
    });

    setChat([...chat, { user: message, bot: res.data.reply }]);
    setMessage("");
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">AgroVision Chatbot</h2>

      <div className="h-64 overflow-y-auto border p-2 my-2">
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <ul>
              {c.bot.map((b, j) => (
                <li key={j}>👉 {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full"
        placeholder="Ask about crop, fertilizer, irrigation..."
      />

      <button
        onClick={sendMessage}
        className="bg-green-600 text-white px-4 py-2 mt-2"
      >
        Send
      </button>
    </div>
  );
}

export default Chatbot;