import React from 'react';
import { motion } from 'framer-motion';
import metroImage from '../assets/PatnaMetro.png'; 
import { useLanguage } from '../utils/LanguageContext';

function Hero() {
  const { t } = useLanguage();

  return (
    <section 
      className="relative h-96 flex items-center justify-center text-white overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${metroImage}) center/cover`
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Patna Metro Explorer
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-6"
        >
          Smart way to navigate the city
        </motion.p>
        <motion.a
          href="#route-finder"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
        >
          Find Your Route
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;