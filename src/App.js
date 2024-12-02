import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage"; 
import ArduinoPlayground from "./components/ArduinoPlayground"; 
import TurtleBot3 from "./components/TurtleBot3Playground"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Route for Homepage */}
        <Route path="/arduino-playground" element={<ArduinoPlayground />} /> {/* Route for Arduino Playground */}
        <Route path="/turtlebot3-playground" element={<TurtleBot3 />} /> {/* Route for TurtleBot3 Playground */}
      </Routes>
    </Router>
  );
};

export default App;
