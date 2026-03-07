import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaSitemap, FaHome, FaSearch, FaMap, FaRupeeSign, FaInfoCircle, FaShieldAlt, FaFileContract, FaArrowRight } from "react-icons/fa";

function Sitemap() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const links = [
    { to: "/", label: t('nav.home'), icon: <FaHome className="text-blue-500" />, color: "border-blue-500" },
    { to: "/routefinder", label: t('nav.routeFinder'), icon: <FaSearch className="text-green-500" />, color: "border-green-500" },
    { to: "/metro-map", label: t('nav.metroMap'), icon: <FaMap className="text-purple-500" />, color: "border-purple-500" },
    { to: "/fare-info", label: t('nav.fareInfo'), icon: <FaRupeeSign className="text-red-500" />, color: "border-red-500" },
    { to: "/about", label: t('nav.about'), icon: <FaInfoCircle className="text-yellow-500" />, color: "border-yellow-500" },
    { to: "/privacy-policy", label: t('privacyPolicy.title'), icon: <FaShieldAlt className="text-blue-400" />, color: "border-blue-400" },
    { to: "/terms-of-service", label: t('terms.title'), icon: <FaFileContract className="text-indigo-400" />, color: "border-indigo-400" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
          >
            <FaSitemap className="text-4xl" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#0B3D91] mb-6"
          >
            {t('nav.sitemap') || "Sitemap"}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t('sitemap.description') || "A complete index of all pages available on the Patna Metro network portal."}
          </motion.p>
        </div>

        {/* Links Grid Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {links.map((link, index) => (
            <Link 
              key={index} 
              to={link.to}
              className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center justify-between group border-l-4 ${link.color}`}
            >
              <div className="flex items-center">
                <div className="text-2xl mr-4 p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                  {link.icon}
                </div>
                <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {link.label}
                </span>
              </div>
              <FaArrowRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Sitemap;