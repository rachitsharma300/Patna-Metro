import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExpand, FaDownload, FaCompress } from "react-icons/fa";
import metroMapImage from "../assets/PatnaMap.png";
import { useState, useRef } from "react";

const MetroMapModal = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef(null);
  const imageRef = useRef(null);

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
      modalRef.current
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with controls */}
            <div className="flex justify-between items-center bg-blue-600 text-white p-4">
              <h3 className="text-xl font-bold">Patna Metro Map</h3>
              <div className="flex space-x-4">
                <button
                  className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                  title="Download"
                  onClick={handleDownload}
                >
                  <FaDownload />
                </button>
                <button
                  className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-red-500 rounded-full transition-colors"
                  title="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="h-[70vh] p-4 flex items-center justify-center bg-gray-100">
              <img
                ref={imageRef}
                src={metroMapImage}
                alt="Patna Metro Map"
                className="max-w-full max-h-full object-contain border border-gray-300 shadow-md"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x500?text=Map+Not+Found";
                }}
              />
            </div>

            {/* Footer with legend */}
            <div className="bg-gray-100 p-4 border-t border-gray-300">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-blue-600 mr-2"></div>
                  <span className="text-sm">Blue Line</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-red-600 mr-2"></div>
                  <span className="text-sm">Red Line</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 border-2 border-black rounded-none mr-2"></div>
                  <span className="text-sm">Elevated Interchange</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-black rounded-none mr-2"></div>
                  <span className="text-sm">Underground Interchange</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 bg-lime-500 rounded-full mr-2"></div>
                  <span className="text-sm">Depot</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MetroMapModal;
