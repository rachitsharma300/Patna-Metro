import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-lg ${variants[variant]} ${className}`}
      aria-label="Switch Language"
    >
      {children}
    </motion.button>
  );
};

export default Button;
