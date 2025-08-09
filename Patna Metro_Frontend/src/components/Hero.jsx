import React from "react";
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
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import metroImage from "../assets/patnaMetro2.png";
import cmImage from "../assets/CM.png";
import pmImage from "../assets/PM.jpg";
import MetroSvg from "../assets/Metro.svg";


function Hero() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "hi" : "en");
  };

  return (
    <section className="flex flex-col lg:flex-row min-h-[90vh] w-full overflow-hidden bg-blue-950">
      {/* Left Section - Metro Image */}
      <div className="lg:w-1/2 h-[30vh] lg:h-auto relative">
        <img
          src={metroImage}
          alt="Patna Metro"
          className="w-full h-full object-cover object-center"
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
            // className="mb-1"
          >
            <h1 className="text-2xl md:text-5xl font-bold text-white text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-300">
                {t("hero.title")}
              </span>
            </h1>

            {/* Metro SVG */}
            <div className="mt-0 flex justify-center">
              <img src={MetroSvg} alt="Metro Route" className="w-full max-w-md" />
            </div>
          </motion.div>
          <img
            src={cmImage}
            alt="CM Nitish Kumar"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-white"
          />
        </div>

        {/* Rest of the content remains exactly the same */}
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

        {/* Navigation Buttons - Unique Colors */}
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        ></motion.div>

        {/* News Ticker */}
        <div className="mt-4 py-3 overflow-hidden bg-black/20 rounded-lg">
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
      </div>
    </section>
  );
}

export default Hero;
