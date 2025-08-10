import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSubway,
  FaMap,
  FaSearch,
  FaInfoCircle,
  FaLanguage,
  FaTimes,
  FaRupeeSign,
  FaBars,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Import your images
import metroImage1 from "../assets/patnaMetro1.png";
import metroImage2 from "../assets/patnaMetro2.png";
import metroImage3 from "../assets/patnaMetro3.png";
import cmImage from "../assets/CM.png";
import pmImage from "../assets/PM.jpg";

// Array of images for the slider
const metroImages = [metroImage1, metroImage2, metroImage3];

function Hero() {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "hi" : "en");
  };

  // Logic for the automatic image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === metroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); 

    return () => clearInterval(interval);  }, []);

  return (
    <section className="flex flex-col min-h-[90vh] w-full overflow-hidden bg-blue-950">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Section - Image Carousel C.logic */}
        <div className="lg:w-1/2 h-[30vh] lg:h-auto relative">
          <img
            src={metroImages[currentImageIndex]}
            alt="Patna Metro"
            className="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
          />
        </div>

        {/* Right Section - Content */}
        <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          {/* Title with CM and PM photos */}
          <div className="flex items-end justify-between mb-4">
            <img
              src={pmImage}
              alt="PM Narendra Modi"
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-white"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-5xl font-bold text-white text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-300">
                  {t("hero.title")}
                </span>
              </h1>
            </motion.div>
            <img
              src={cmImage}
              alt="CM Nitish Kumar"
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-white"
            />
          </div>

          {/* Rest of the content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-base md:text-lg text-blue-100 text-center">
              {t("hero.description")}
            </p>
          </motion.div>

          {/* Navigation Buttons  */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:flex md:justify-center flex-wrap gap-3 mb-8"
          >
            <Link
              to="/"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white transition-all rounded-lg bg-blue-600 hover:bg-blue-500 gap-2"
            >
              <FaSubway className="text-base" />
              {t("nav.home")}
            </Link>
            <Link
              to="/routefinder"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white transition-all rounded-lg bg-green-600 hover:bg-green-500 gap-2"
            >
              <FaSearch className="text-base" />
              {t("nav.routeFinder")}
            </Link>
            <Link
              to="/metro-map"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white transition-all rounded-lg bg-purple-600 hover:bg-purple-500 gap-2"
            >
              <FaMap className="text-base" />
              {t("nav.metroMap")}
            </Link>
            <Link
              to="/fare-info"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white transition-all rounded-lg bg-red-600 hover:bg-red-500 gap-2"
            >
              <FaRupeeSign className="text-base" />
              {t("nav.fareInfo")}
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white transition-all rounded-lg bg-yellow-600 hover:bg-yellow-500 gap-2"
            >
              <FaInfoCircle className="text-base" />
              {t("nav.about")}
            </Link>
            <button
              onClick={changeLanguage}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white transition-all rounded-lg bg-pink-600 hover:bg-pink-500 gap-2"
            >
              <FaLanguage className="text-base" />
              {i18n.language === "en" ? "हिन्दी" : "English"}
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* News Ticker */}
      <div className="w-full py-3 overflow-hidden bg-black/20 rounded-none md:rounded-lg mt-4">
        <motion.div
          className="text-sm font-medium text-yellow-400 whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {t("hero.ticker")}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;