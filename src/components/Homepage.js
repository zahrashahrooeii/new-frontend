import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-center mt-4">
        <img
          src="/logo3.jpg" 
          alt="ROS Logo"
          className="w-12 h-12 mb-2"
        />
        <h1
          className="text-lg md:text-3xl font-semibold text-center"
          style={{ fontFamily: "Open Sans" }}
        >
          Welcome to ROSDuino
        </h1>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <Link to="/arduino-playground">
          <button
            className="w-[342px] h-[96px] rounded-[26px] bg-[#F2F2F2] border border-[#D1D1D1] hover:bg-[#D9D9D9] mb-6 shadow-sm text-lg font-semibold"
            style={{ fontFamily: "Open Sans" }}
          >
            Arduino Playground
          </button>
        </Link>
        <Link to="/turtlebot3-playground">
          <button
            className="w-[342px] h-[96px] rounded-[26px] bg-[#F2F2F2] border border-[#D1D1D1] hover:bg-[#D9D9D9] mb-6 shadow-sm text-lg font-semibold"
            style={{ fontFamily: "Open Sans" }}
          >
            TurtleBot3 Playground
          </button>
        </Link>
        <div ref={dropdownRef} className="relative">
          <button
            className={`w-[342px] h-[96px] rounded-[26px] bg-[#F2F2F2] border border-[#D1D1D1] shadow-sm text-lg font-semibold ${
              dropdownOpen ? "bg-[#BFBFBF]" : "hover:bg-[#D9D9D9]"
            }`}
            style={{ fontFamily: "Open Sans" }}
            onClick={toggleDropdown}
          >
            Tasks
          </button>
          {dropdownOpen && (
            <div
              className="absolute top-[110%] left-0 bg-white border border-[#D1D1D1] rounded-lg shadow-md w-[342px] z-10"
            >
              <ul className="divide-y divide-[#D1D1D1]">
                <li
                  className="px-6 py-4 text-center hover:bg-[#D9D9D9] cursor-pointer rounded-t-lg"
                  style={{ fontFamily: "Open Sans" }}
                >
                  Task 1
                </li>
                <li
                  className="px-6 py-4 text-center hover:bg-[#D9D9D9] cursor-pointer"
                  style={{ fontFamily: "Open Sans" }}
                >
                  Task 2
                </li>
                <li
                  className="px-6 py-4 text-center hover:bg-[#D9D9D9] cursor-pointer rounded-b-lg"
                  style={{ fontFamily: "Open Sans" }}
                >
                  Task 3
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
