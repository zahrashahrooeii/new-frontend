import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage"; // Your main page with buttons
import ArduinoPlayground from "./components/ArduinoPlayground";
import Turtlebot3Playground from "./components/TurtleBot3Playground";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        {/* Arduino Playground */}
        <Route path="/arduino-playground" element={<ArduinoPlayground />} />
        {/* Turtlebot3 Playground */}
        <Route path="/turtlebot3-playground" element={<Turtlebot3Playground />} />
      </Routes>
    </Router>
  );
}

export default App;
