import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;