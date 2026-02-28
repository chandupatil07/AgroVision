import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/AgroVisio.jpg";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-green-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-4 group">
          
          {/* Updated Logo Wrapper */}
          <div className="p-1 rounded-full bg-green-700 shadow-lg 
                          group-hover:shadow-green-400/40 
                          transition duration-300">
            <img
              src={logo}
              alt="AgroVision Logo"
              className="h-14 w-14 object-cover rounded-full 
                         border-2 border-green-300 
                         group-hover:scale-105 
                         transition duration-300"
            />
          </div>

          <span className="text-2xl font-bold text-white tracking-wide 
                           group-hover:text-green-200 transition duration-300">
            AgroVision
          </span>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-8 text-lg">

       <Link
  to="/"
  className={`relative text-white font-medium px-3 py-1
    transition-all duration-300 ease-in-out
    hover:text-green-200
    after:absolute after:left-0 after:-bottom-1 
    after:h-[2px] after:w-0 
    after:bg-green-300
    after:transition-all after:duration-300
    hover:after:w-full
    ${location.pathname === "/" ? "text-green-200 after:w-full" : ""}`}
>
  Home
</Link>

       <Link
  to="/login"
  className={`relative text-white font-medium px-3 py-1
    transition-all duration-300 ease-in-out
    hover:text-green-200
    after:absolute after:left-0 after:-bottom-1 
    after:h-[2px] after:w-0 
    after:bg-green-300
    after:transition-all after:duration-300
    hover:after:w-full
    ${location.pathname === "/login" ? "text-green-200 after:w-full" : ""}`}
>
  Login
</Link>

       <Link
  to="/register"
  className="relative px-6 py-2 rounded-lg font-semibold text-white 
             bg-green-600 overflow-hidden 
             transition-all duration-300 ease-in-out
             hover:bg-green-500 hover:-translate-y-1 
             hover:shadow-xl hover:shadow-green-900/40
             active:translate-y-0 active:shadow-md"
>
  Register
</Link>

        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button className="text-white text-3xl">☰</button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;