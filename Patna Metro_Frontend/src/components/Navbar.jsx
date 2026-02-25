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
  FaBars,
  FaRupeeSign,
  FaAndroid,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import MetroMapModal from "../components/MetroMapModal";
import Button from "../components/ui/Button";
import { useTranslation } from "react-i18next";
import PatnaLogo from "../assets/PatnaLogo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("home"), path: "/", icon: <FaSubway /> },
    { name: t("routeFinder"), path: "/routefinder", icon: <FaSearch /> },
    {
      name: t("metroMap"),
      action: () => {
        setShowMapModal(true);
        setMobileMenuOpen(false); // Close menu when modal opens
      },
      icon: <FaMap />,
    },
    { name: t("fareInfo"), path: "/fare-info", icon: <FaRupeeSign /> },
    { name: t("about"), path: "/about", icon: <FaInfoCircle /> },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? "py-1 shadow-lg bg-gradient-to-r from-[#0B3D91] via-[#1a4ca3] to-[#2b5cb5]"
          : "py-3 bg-gradient-to-r from-[#0B3D91] to-[#1a4ca3]"
          } text-white`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 md:w-12 md:h-12 overflow-hidden"
              >
                <img
                  src={PatnaLogo}
                  alt="Patna Metro Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-yellow-300 transition-colors leading-tight">
                  Patna Metro
                </span>
                <span className="text-[10px] md:text-xs text-white/80 font-medium italic">
                  Bihar's capital on the move
                </span>
              </div>
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

              <a
                href="/patna-metro.apk"
                download
                className="hidden lg:flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#0B3D91] font-bold rounded-full transition-all shadow-md gap-2"
              >
                <FaAndroid size={18} />
                <span>Get App</span>
              </a>
              <Button onClick={toggleLanguage} variant="primary" ariaLabel={i18n.language === "en" ? "Switch to Hindi" : "अंग्रेजी में बदलें"}>
                <FaLanguage className="mr-2" />
                {i18n.language === "en" ? "हिंदी" : "English"}
              </Button>
            </div>

            <button
              className="md:hidden text-xl focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gradient-to-b from-[#0B3D91] to-[#1a4ca3] overflow-hidden"
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
                        onClick={item.action}
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-colors mb-1"
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    )}
                  </motion.div>
                ))}

                <div className="border-t border-white/20 mt-2 pt-3 flex flex-col gap-3">
                  <a
                    href="/patna-metro.apk"
                    download
                    className="flex items-center w-full px-4 py-3 rounded-lg bg-yellow-400 text-[#0B3D91] font-bold shadow-lg gap-3"
                  >
                    <FaAndroid size={20} />
                    <span>Download Android App</span>
                  </a>
                  <Button onClick={toggleLanguage} variant="primary" className="w-full justify-center" ariaLabel={i18n.language === "en" ? "Switch to Hindi" : "अंग्रेजी में बदलें"}>
                    <FaLanguage className="mr-3" />
                    {i18n.language === "en" ? "हिंदी" : "English"}
                  </Button>
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