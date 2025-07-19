// src/components/Navbar.jsx
import { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import MetroMapModal from "../components/MetroMapModal";
import { useLanguage } from "../utils/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("home"), path: "/", icon: <FaSubway /> },
    { name: t("routeFinder"), path: "/RouteFinder", icon: <FaSearch /> },
    {
      name: t("metroMap"),
      action: () => setShowMapModal(true),
      icon: <FaMap />,
    },
    { name: t("fareInfo"), path: "/fare-info", icon: <FaRupeeSign /> },
    { name: t("about"), path: "/about", icon: <FaInfoCircle /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 shadow-lg bg-gradient-to-r from-blue-800 to-red-800"
            : "py-4 bg-gradient-to-r from-blue-600 to-red-600"
        } text-white`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
                className="text-2xl"
              >
                <FaSubway />
              </motion.div>
              <span className="text-xl font-bold group-hover:text-yellow-300 transition-colors">
                {t("Patna Metro")}
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) =>
                item.path ? (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <span className="mr-2 group-hover:text-yellow-300">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.action}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <span className="mr-2 group-hover:text-yellow-300">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </button>
                )
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center px-3 py-2 rounded-lg bg-black/20 hover:bg-white/10 transition-colors"
                aria-label={t("selectLanguage")}
              >
                <FaLanguage className="mr-2" />
                {language === "en" ? "हिंदी" : "English"}
              </motion.button>
            </div>

            <button
              className="md:hidden text-2xl focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gradient-to-b from-blue-700 to-red-700 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-colors mb-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          item.action();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-colors mb-1"
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    )}
                  </motion.div>
                ))}

                <div className="border-t border-white/20 mt-2 pt-3">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FaLanguage className="mr-3" />
                    {language === "en"
                      ? "हिंदी में बदलें"
                      : "Switch to English"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <MetroMapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
      />
    </>
  );
};

export default Navbar;
