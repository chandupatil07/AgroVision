import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-green-100">

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 gap-10">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-green-800 leading-tight">
            AgroVision 🌱 <br /> Smart Farming With AI
          </h1>

          <p className="text-gray-700 text-lg">
            AgroVision is an AI-powered agriculture platform that helps farmers
            with crop prediction, disease detection, nutrient deficiency analysis
            and weather-based recommendations for better yield.
          </p>

          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-100 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
         <img
  src="/src/assets/bg.jpg"
  alt="farming"
 className="w-full h-[420px] object-cover object-center
           rounded-2xl shadow-2xl
           hover:scale-105 transition duration-500"
/>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="px-10 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Our Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { title: "Crop Prediction", desc: "AI-based crop suggestions based on soil and climate" },
            { title: "Disease Detection", desc: "Upload plant image to detect diseases" },
            { title: "Deficiency Analysis", desc: "Find nutrient deficiencies in crops" },
            { title: "Weather Forecast", desc: "Weather-based smart farming advice" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-green-50 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="px-10 py-16 bg-green-100">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          About AgroVision
        </h2>

        <p className="max-w-4xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
          AgroVision is designed to empower farmers using Artificial Intelligence
          and data-driven insights. Our mission is to reduce crop loss, improve
          productivity and provide modern digital tools for smart agriculture.
          AgroVision integrates crop recommendation, disease detection, nutrient
          analysis and weather forecasting into a single platform.
        </p>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="px-10 py-16 bg-white">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl bg-green-50 shadow hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-green-700">1000+</h3>
            <p className="text-gray-600">Farmers Benefited</p>
          </div>

          <div className="p-6 rounded-xl bg-green-50 shadow hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-green-700">5+</h3>
            <p className="text-gray-600">AI Models</p>
          </div>

          <div className="p-6 rounded-xl bg-green-50 shadow hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-green-700">10000+</h3>
            <p className="text-gray-600">Predictions</p>
          </div>

          <div className="p-6 rounded-xl bg-green-50 shadow hover:scale-105 transition">
            <h3 className="text-4xl font-bold text-green-700">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="px-10 py-16 bg-green-100">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
          Why Choose AgroVision?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Accurate AI Predictions",
            "User Friendly Interface",
            "Secure & Reliable System",
            "Fast Disease Detection",
            "Smart Weather Integration",
            "Modern Agriculture Solutions",
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow hover:bg-green-50 hover:-translate-y-2 transition duration-300"
            >
              <p className="text-lg font-semibold text-green-700 text-center">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="px-10 py-20 bg-green-700 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Smart Farming Journey Today 🌾
        </h2>

        <p className="mb-6">
          Join AgroVision and improve your crop productivity with AI-powered
          solutions.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-green-700 rounded-lg hover:bg-green-100 transition"
          >
            Register Now
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-white rounded-lg hover:bg-green-800 transition"
          >
            Login
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;