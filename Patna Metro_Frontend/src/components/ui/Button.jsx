import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../utils/LanguageContext';
// import { useLanguage } from '../utils/LanguageContext';

export const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const { t } = useLanguage();
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
      aria-label={typeof children === 'string' ? t(children) : ''}
    >
      {typeof children === 'string' ? t(children) : children}
    </motion.button>
  );
};