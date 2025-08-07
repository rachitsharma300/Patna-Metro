import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export const InterchangeIcon = ({
  size = 40,
  onClick = () => {},
  animated = true,
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={animated ? { scale: 1.1, rotate: 180 } : {}}
      whileTap={animated ? { scale: 0.9 } : {}}
      className={`
        flex items-center justify-center 
        rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 
        text-black font-bold shadow-md hover:shadow-lg
        cursor-pointer border-2 border-yellow-600
        transition-all duration-200
      `}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.6,
      }}
      aria-label="Interchange"
    >
      {animated ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          ⇄
        </motion.span>
      ) : (
        <span>⇄</span>
      )}
    </motion.button>
  );
};
