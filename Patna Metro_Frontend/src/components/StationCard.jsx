import React from "react";
import { motion } from "framer-motion";
import { FaTrain } from "react-icons/fa";

function StationCard({ station }) {
  const isRedLine = station.line === "Red Line";
  const lineColor = isRedLine
    ? "from-red-600 to-red-500"
    : "from-blue-600 to-blue-500";
  const textColor = isRedLine ? "text-red-600" : "text-blue-600";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`flex items-center justify-between p-4 rounded-xl shadow-lg bg-gradient-to-r ${lineColor} text-white w-full max-w-md backdrop-blur-md bg-opacity-80`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
          <FaTrain className={`text-xl ${textColor}`} />
        </div>
        <div>
          <p className="font-bold text-lg">{station.name}</p>
          <p className="text-xs opacity-80">{station.code}</p>{" "}
          {/* Optional station code */}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          {station.line}
        </span>
        <svg
          className="w-4 h-4 text-white opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default StationCard;
