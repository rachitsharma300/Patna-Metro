import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaTrain } from "react-icons/fa";

const StationTrack = () => {
  return (
    <div className="flex items-center justify-center my-1 relative h-10">
      <div className="w-1 bg-gray-400 h-full rounded"></div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0"
      >
        <FaTrain className="text-gray-600 text-sm" />
      </motion.div>
    </div>
  );
};

export default StationTrack;
