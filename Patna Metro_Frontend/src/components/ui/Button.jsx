import React from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, variant = 'primary', className = '', ariaLabel }) => {
  const variants = {
    primary: 'bg-[#0B3D91] hover:bg-[#1a4ca3] text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-lg ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};

export default Button;
