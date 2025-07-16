// Enhanced Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSubway } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-4'} bg-gradient-to-r from-red-600 to-blue-600 text-white`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaSubway className="text-2xl" />
          <span className="text-xl font-bold hover:text-yellow-300 transition-colors">Patna Metro</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition-colors font-medium">Home</Link>
          <a href="#route-finder" className="hover:text-yellow-300 transition-colors font-medium">Route Finder</a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;