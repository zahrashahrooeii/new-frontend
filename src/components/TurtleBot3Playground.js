import React, { useState } from "react";
import { Link } from "react-router-dom";

const Turtlebot3Playground = () => {
  const [activePanel, setActivePanel] = useState("code"); // 'code' or 'modifier'
  const [isAutoCodeActive, setIsAutoCodeActive] = useState(false); // AutoCode Generator state
  const [code, setCode] = useState(""); // Python code state
  const [fileName, setFileName] = useState(""); // File name state
  const [blocks, setBlocks] = useState(""); // Loaded block data state

  // Save Python code
  const handleSaveCode = () => {
    if (!fileName) {
      alert("Please provide a file name.");
      return;
    }
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName.endsWith(".py") ? fileName : `${fileName}.py`;
    link.click();
  };

  // Save block data
  const handleSaveBlock = () => {
    if (!blocks) {
      alert("No block data to save.");
      return;
    }
    const blob = new Blob([blocks], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName ? `${fileName}.xml` : "block-data.xml";
    link.click();
  };

  // Load block data
  const handleLoadBlock = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setBlocks(e.target.result);
      alert("Block data loaded successfully!");
    };
    reader.readAsText(file);
  };

  // Reset the code and blocks
  const handleReset = () => {
    setCode("");
    setBlocks("");
    setFileName("");
    alert("Code, blocks, and output have been reset.");
  };

  // Discard the code
  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      setCode("");
      alert("Changes discarded.");
    }
  };

  // Toggle AutoCode Generator
  const handleAutoCodeClick = () => {
    setIsAutoCodeActive((prev) => !prev);
    if (!isAutoCodeActive) {
      alert("AutoCode Generator is activated. Code is being generated in the background!");
      // Add the AutoCode generation logic here, without updating the `code` state
    }
  };

  // Run Python code (placeholder)
  const handleRun = () => {
    alert("Run functionality is triggered. This is a placeholder for running the Python code.");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen p-10 bg-white relative">
      {/* Left Panel */}
      <div className="flex flex-col w-full lg:w-[55%] rounded-lg">
        <div
          className="border w-full h-[640px] rounded-md bg-white"
          style={{ resize: "none" }}
        >
          <p className="text-gray-500 p-5">Blockly will be integrated here.</p>
        </div>
        <div className="flex items-center justify-between mt-4 gap-14">
          {/* File Name Section */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">File Name</label>
            <input
              type="text"
              placeholder="Enter file name"
              className="w-1/3 border rounded-md p-1 text-sm"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <button
              onClick={handleSaveBlock}
              className="px-1 py-1 text-xs rounded-md text-white bg-[#5E7290] hover:bg-[#364C6D]"
            >
              Save Block
            </button>
          </div>
          {/* File Upload Section */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Select File</label>
            <input
              type="file"
              className="w-1/2 border rounded-md text-xs px-1 py-1"
              onChange={handleLoadBlock}
            />
            <button className="px-1 py-1 text-xs rounded-md text-white bg-[#5E7290] hover:bg-[#364C6D]">
              Load Block
            </button>
          </div>
        </div>
      </div>

      {/* Right Panels */}
      <div className="flex flex-col w-full lg:w-[50%] gap-2">
        {/* Buttons */}
        <div className="flex items-center justify-between mb-1">
          {/* Left-aligned buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleRun}
              className="px-3 py-0.5 text-sm rounded-md text-white bg-green-500 hover:bg-green-600"
            >
              Run
            </button>
            <button
              onClick={() => setActivePanel("code")}
              className={`px-1 py-0.5 text-sm rounded-md text-white ${
                activePanel === "code"
                  ? "bg-[#5E7290] hover:bg-[#364C6D]"
                  : "bg-[#5E7290] hover:bg-[#364C6D]"
              }`}
            >
              Code Generator
            </button>
            <button
              onClick={() => setActivePanel("modifier")}
              className={`px-1 py-0.5 text-sm rounded-md text-white ${
                activePanel === "modifier"
                  ? "bg-[#5E7290] hover:bg-[#364C6D]"
                  : "bg-[#5E7290] hover:bg-[#364C6D]"
              }`}
            >
              Code Modifier
            </button>
            <button
              onClick={handleAutoCodeClick}
              className={`px-1 py-1 text-xs rounded-md text-white ${
                isAutoCodeActive
                  ? "bg-[#27592A]"
                  : "bg-[#5E7290] hover:bg-[#364C6D]"
              }`}
            >
              AutoCode Generator
            </button>
          </div>
          {/* Right-aligned buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-1.5 py-1 text-xs rounded-md text-white bg-[#FFA726] hover:bg-[#E18B0D]"
            >
              Reset
            </button>
            <button
              onClick={handleDiscard}
              className="px-1.5 py-1 text-xs rounded-md text-white bg-[#FFA726] hover:bg-[#E18B0D]"
            >
              Discard
            </button>
          </div>
        </div>

        {/* Conditionally Render Panels */}
        {activePanel === "code" ? (
          <>
            {/* Python Code Panel */}
            <div className="mb-1">
              <h2 className="text-lg font-bold text-[#000000]"> Python Code</h2>
              <textarea
                className="border w-full h-[220px] rounded-md p-2 text-sm bg-white"
                placeholder="Write your Python code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  resize: "none",
                  overflowY: "auto",
                  overflowX: "auto",
                  whiteSpace: "pre",
                }}
              ></textarea>
            </div>
            {/* File Name and Save Code */}
            <div className="flex items-center justify-start gap-2">
              <label className="text-sm font-medium">File Name</label>
              <input
                type="text"
                placeholder="Enter file name"
                className="w-1/5 border rounded-md p-1 text-sm"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
              <button
                onClick={handleSaveCode}
                className="px-2 py-1 rounded-md text-white bg-[#5E7290] hover:bg-[#364C6D] text-xs"
              >
                Save Code
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Code Modifier Panel */}
            <div className="mb-1">
              <h2 className="text-lg font-bold text-[#000000]">
                Python Code Modifier
              </h2>
              <textarea
                className="border w-full h-[220px] rounded-md p-2 text-sm bg-white"
                placeholder="Modify your Python code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  resize: "none",
                  overflowY: "auto",
                  overflowX: "auto",
                  whiteSpace: "pre",
                }}
              ></textarea>
            </div>
            {/* File Name and Save Code */}
            <div className="flex items-center justify-start gap-2">
              <label className="text-sm font-medium">File Name</label>
              <input
                type="text"
                placeholder="Enter file name"
                className="w-1/5 border rounded-md p-1 text-sm"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
              <button
                onClick={handleSaveCode}
                className="px-2 py-1 rounded-md text-white bg-[#5E7290] hover:bg-[#364C6D] text-xs"
              >
                Save Code
              </button>
            </div>
          </>
        )}

        {/* Output Panel */}
        <div className="flex flex-col mt-5">
          <h2 className="text-lg font-bold text-[#000000] mb-1.5">Output</h2>
          <textarea
            className="border w-full h-[246px] rounded-md p-2 text-sm bg-white"
            placeholder="Output will be displayed here..."
            readOnly
            style={{
              resize: "none",
              overflowY: "auto",
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          ></textarea>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="absolute bottom-6 right-6">
        <Link to="/">
          <button className="px-2 py-2 rounded-md bg-[#FFA726] hover:bg-[#E18B0D] text-white text-xs shadow-md">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Turtlebot3Playground;
