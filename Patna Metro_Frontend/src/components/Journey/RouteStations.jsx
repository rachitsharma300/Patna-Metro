import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import StationCard from "../StationCard";

const RouteStations = ({ route }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Your Journey Route
      </h3>
      <div className="space-y-4">
        {route.map((st, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center"
          >
            <StationCard station={st} />
            {idx < route.length - 1 && (
              <div className="h-6 w-0.5 bg-gray-300 my-1"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RouteStations;
