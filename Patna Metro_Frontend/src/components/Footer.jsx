import { Link } from "react-router-dom";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getVisitCount } from "../services/api";
import PatnaLogo from "../assets/PatnaLogo.png";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const metroLines = [
    { name: "Blue Line", stations: 12, length: "16.94 km" },
    { name: "Red Line", stations: 13, length: "14.45 km" },
  ];
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    getVisitCount()
      .then((count) => setVisitCount(count))
      .catch(() => {
      });
  }, []);


  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gray-900 text-gray-300 pt-12 pb-6"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Contact Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={PatnaLogo} alt="Patna Metro" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight">Patna Metro</h3>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-widest italic">Bihar's capital on the move</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start group">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span className="leading-relaxed">{t("footer.address")}</span>
              </div>
              <div className="flex items-center group">
                <FaPhone className="mr-3 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span className="hover:text-white transition-colors cursor-pointer">{t("footer.phone")}</span>
              </div>
              <div className="flex items-center group">
                <MdEmail className="mr-3 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span className="hover:text-white transition-colors cursor-pointer">{t("footer.email")}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <a href="https://github.com/rachitsharma300" target="_blank" rel="noreferrer" className="bg-gray-800 p-2.5 rounded-xl hover:bg-blue-600 transition-all duration-300 text-gray-400 hover:text-white shadow-lg" aria-label="GitHub Profile">
                <FaGithub size={18} />
              </a>
              <a href="https://x.com/rachitsharma300" target="_blank" rel="noreferrer" className="bg-gray-800 p-2.5 rounded-xl hover:bg-blue-400 transition-all duration-300 text-gray-400 hover:text-white shadow-lg" aria-label="Twitter Profile">
                <FaTwitter size={18} />
              </a>
              <a href="https://www.instagram.com/rachitsharma300/" target="_blank" rel="noreferrer" className="bg-gray-800 p-2.5 rounded-xl hover:bg-pink-600 transition-all duration-300 text-gray-400 hover:text-white shadow-lg" aria-label="Instagram Profile">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-gray-800 p-2.5 rounded-xl hover:bg-blue-700 transition-all duration-300 text-gray-400 hover:text-white shadow-lg" aria-label="LinkedIn Profile">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-1 bg-blue-600 rounded-full mr-3"></span>
              {t("footer.quickLinksTitle")}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link to="/routefinder" className="hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  {t("footer.quickLinks.routeFinder")}
                </Link>
              </li>
              <li>
                <Link to="/fare-info" className="hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  {t("footer.quickLinks.fareInfo")}
                </Link>
              </li>
              <li>
                <Link to="/metro-map" className="hover:text-blue-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                  {t("footer.quickLinks.metroMap")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Metro Lines Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-1 bg-blue-600 rounded-full mr-3"></span>
              {t("footer.metroLinesTitle")}
            </h4>
            <div className="space-y-4">
              {metroLines.map((line, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all group">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-3 shadow-[0_0_10px_rgba(255,255,255,0.2)] ${line.name.includes("Blue") ? "bg-blue-500" : "bg-red-500"}`}></div>
                    <span className="font-bold text-gray-200">{line.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium ml-6">
                    {line.stations} stations • {line.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-1 bg-blue-600 rounded-full mr-3"></span>
              Stay Updated
            </h4>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Subscribe to get the latest updates on station openings and metro timings.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder={t("footer.subscribePlaceholder")}
                className="w-full px-4 py-4 bg-gray-800/50 text-white rounded-2xl border border-gray-800 focus:border-blue-500 outline-none transition-all pr-12 text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg active:scale-95">
                Go
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{t("footer.copyright", { year: currentYear })}</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-yellow-400">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="hover:text-yellow-400">
                Sitemap
              </Link>
            </div>
          </div>
          {/* <p className="mt-4 text-gray-500">{t("footer.developedBy")}</p> */}
          {visitCount !== null && (
            <p className="mt-3 text-xs text-gray-500">
              👥 Visited by{" "}
              <span className="font-semibold text-gray-300">
                {visitCount}
              </span>{" "}
              users
            </p>
          )}

          <p className="mt-2 text-gray-500">
            {t("footer.developedBy")}
          </p>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
