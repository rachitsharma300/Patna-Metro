// Enhanced StationCard.jsx
import React from "react";
import { motion } from "framer-motion";

function StationCard({ station }) {
  const lineColor =
    station.line === "Red Line"
      ? "bg-gradient-to-r from-red-600 to-red-500"
      : "bg-gradient-to-r from-blue-600 to-blue-500";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center justify-between p-4 rounded-xl shadow-md ${lineColor} text-white w-full max-w-md`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
          <span
            className={`text-sm font-bold ${station.line === "Red Line" ? "text-red-600" : "text-blue-600"}`}
          >
            {station.line.charAt(0)}
          </span>
        </div>
        <span className="font-bold text-lg">{station.name}</span>
      </div>
      <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
        {station.line}
      </span>
    </motion.div>
  );
}

export default StationCard;
