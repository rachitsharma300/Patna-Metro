import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import metroImage from "../assets/patnaMetro.png";

function Hero() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${metroImage}) center/cover`,
      }}
    >
      {/* Overlay animated metro line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 z-20">
        <motion.div
          className="h-full w-16 bg-white"
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-500"
        >
          {t("hero.title")}
        </motion.h1>

        {/* About Patna Metro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 font-medium max-w-2xl mx-auto"
        >
          {t("hero.description")}
        </motion.p>

        {/* Visible Navbar Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <Link to="/" className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-full transition">
            {t("nav.home")}
          </Link>
          <Link to="/routefinder" className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-full transition">
            {t("nav.routeFinder")}
          </Link>
          <Link to="/metro-map" className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-full transition">
            {t("nav.metroMap")}
          </Link>
          <Link to="/fare-info" className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-full transition">
            {t("nav.fareInfo")}
          </Link>
          <Link to="/about" className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-full transition">
            {t("nav.about")}
          </Link>
          <button
            onClick={() => changeLanguage(i18n.language === "en" ? "hi" : "en")}
            className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-full transition"
          >
            {i18n.language === "en" ? "हिन्दी" : "English"}
          </button>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#route-finder"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-10 rounded-full shadow-lg transition-all mb-10"
        >
          {t("hero.cta")}
        </motion.a>
      </div>

      {/* Emergency right side */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 1 }}
  className="hidden md:block absolute top-1/3 right-4 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 max-w-xs shadow-xl border border-white border-opacity-30 text-sm"
>
        <h2 className="text-lg font-bold mb-3 text-white">{t("hero.emergencyTitle")}</h2>
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-white bg-opacity-20 p-2 rounded">{t("hero.emergencyPolice")}</div>
          <div className="bg-white bg-opacity-20 p-2 rounded">{t("hero.emergencyAmbulance")}</div>
          <div className="bg-white bg-opacity-20 p-2 rounded">{t("hero.emergencyFire")}</div>
          <div className="bg-white bg-opacity-20 p-2 rounded">{t("hero.emergencyMetroHelpline")}</div>
        </div>
      </motion.div>

      {/* Scrolling ticker for updates */}
      <div className="absolute bottom-0 left-0 w-full bg-black py-2 overflow-hidden z-20">
        <motion.div
          className="whitespace-nowrap text-yellow-400 text-sm"
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
