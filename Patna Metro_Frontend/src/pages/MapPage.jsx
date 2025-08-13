import React, { useState, useRef } from "react";
import { FaExpand, FaDownload, FaCompress } from "react-icons/fa";
import metroMapImage from "../assets/PatnaMap.webp";

const MapPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pageRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = metroMapImage;
    link.download = "Patna-Metro-Map.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      pageRef.current
        ?.requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch((err) =>
          console.error("Error attempting to enable fullscreen:", err)
        );
    } else {
      document
        .exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch((err) =>
          console.error("Error attempting to exit fullscreen:", err)
        );
    }
  };

  return (
    <div
      ref={pageRef}
      className="flex flex-col items-center justify-center py-8 px-4 min-h-screen bg-gray-50"
    >
      <h1 className="text-3xl font-bold mb-6">Patna Metro Map</h1>

      {/* Controls */}
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          title="Download"
          onClick={handleDownload}
        >
          <FaDownload />
        </button>
        <button
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      {/* Map */}
      <div className="bg-gray-100 rounded-lg p-2 mb-4 shadow-lg border border-gray-300 max-w-4xl w-full">
        <img
          src={metroMapImage}
          alt="Patna Metro Map"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default MapPage;
