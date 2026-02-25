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
  FaAndroid,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import patnaVideo from "../assets/Patna.mp4";
import AnimatedMetro from "./metro/AnimatedMetro";
import cmImage from "../assets/CM.webp";
import pmImage from "../assets/PM.jpg";
import patnaMetro1 from "../assets/patnaMetro1.webp";

function Hero() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "hi" : "en");
  };
  // Cleaned up slider logic as we are now using Video Banner
  useEffect(() => {
    // Analytics or other side effects can go here
  }, []);

  return (
    <section className="flex flex-col min-h-screen w-full overflow-hidden bg-blue-950 pt-20">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Section - Video Background */}
        <div className="lg:w-1/2 h-[45vh] lg:h-auto relative overflow-hidden group">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={patnaMetro1}
            title="Patna Metro Cinematic Background"
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          >
            <source src={patnaVideo} type="video/mp4" />
          </video>
          {/* Subtle Overlay to blend with the brand colors */}
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
        </div>

        {/* Right Section - Content */}
        <div className="lg:w-1/2 p-4 md:p-10 flex flex-col justify-center">
          {/* Title with CM and PM photos */}
          <div className="flex items-center justify-between mb-6 scale-90 md:scale-100">
            <img
              src={pmImage}
              alt="PM Narendra Modi"
              loading="eager"
              decoding="async"
              className="w-14 h-14 md:w-24 md:h-24 object-cover rounded-full border-2 border-white shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="px-2"
            >
              <h1 className="text-xl md:text-5xl font-bold text-white text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-300">
                  {t("hero.title")}
                </span>
              </h1>
              <div className="mt-2 md:mt-4 flex justify-center w-full">
                <AnimatedMetro />
              </div>
            </motion.div>
            <img
              src={cmImage}
              alt="CM Nitish Kumar"
              loading="eager"
              decoding="async"
              className="w-14 h-14 md:w-24 md:h-24 object-cover rounded-full border-2 border-white shadow-lg"
            />
          </div>

          {/* Rest of the content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <p className="text-sm md:text-lg text-blue-100/80 text-center leading-relaxed max-w-xl mx-auto">
              {t("hero.description")}
            </p>
          </motion.div>

          {/* Navigation Buttons  */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-4"
          >
            <Link
              to="/"
              className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white transition-all rounded-lg bg-blue-600 hover:bg-blue-500 gap-2"
            >
              <FaSubway />
              {t("nav.home")}
            </Link>
            <Link
              to="/routefinder"
              className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white transition-all rounded-lg bg-green-600 hover:bg-green-500 gap-2"
            >
              <FaSearch />
              {t("hero.cta")}
            </Link>
            <Link
              to="/metro-map"
              className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white transition-all rounded-lg bg-purple-600 hover:bg-purple-500 gap-2"
            >
              <FaMap />
              {t("nav.metroMap")}
            </Link>
            <Link
              to="/fare-info"
              className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white transition-all rounded-lg bg-red-600 hover:bg-red-500 gap-2"
            >
              <FaRupeeSign />
              {t("nav.fareInfo")}
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white transition-all rounded-lg bg-yellow-600 hover:bg-yellow-500 gap-2"
            >
              <FaInfoCircle />
              {t("nav.about")}
            </Link>
            <button
              onClick={changeLanguage}
              className="flex items-center justify-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white transition-all rounded-lg bg-pink-600 hover:bg-pink-500 gap-2"
            >
              <FaLanguage />
              {i18n.language === "en" ? "हिन्दी" : "English"}
            </button>
            <a
              href="/patna-metro.apk"
              download
              className="col-span-2 md:col-span-3 flex items-center justify-center px-4 py-3 text-sm font-bold text-center text-white transition-all rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-xl hover:shadow-green-500/20 gap-3 border border-green-400/30"
            >
              <FaAndroid className="text-xl" />
              {t("hero.downloadApp")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="w-full py-2 overflow-hidden bg-black/40 backdrop-blur-sm border-t border-white/5">
        <motion.div
          className="text-xs md:text-sm font-bold text-yellow-400 whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 25,
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