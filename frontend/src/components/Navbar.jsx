import React from "react";

const Navbar = () => {
  return (
    <div className="bg-green-900 text-white px-10 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold text-green-400">
        🌱 AgroVision
      </h1>

      <ul className="flex gap-6 text-lg">
        <li className="cursor-pointer hover:text-green-400 transition">Home</li>
        <li className="cursor-pointer hover:text-green-400 transition">Login</li>
        <li className="cursor-pointer hover:text-green-400 transition">Register</li>
      </ul>

    </div>
  );
};

export default Navbar;