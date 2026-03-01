import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import CropPrediction from "./pages/CropPrediction";
import DiseaseDetection from "./pages/DiseaseDetection";

<Route path="/weather" element={<Weather />} />

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/crop-prediction" element={<CropPrediction />} />
       <Route path="/disease-detection" element={<DiseaseDetection />} />
      </Routes>
    </div>
  );
}

export default App;