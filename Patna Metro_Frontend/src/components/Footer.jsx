import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const metroLines = [
    { name: "Blue Line", stations: 12, length: "16.94 km" },
    { name: "Red Line", stations: 13, length: "14.45 km" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gray-900 text-gray-300 pt-12 pb-6"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-blue-600 w-2 h-6 mr-2"></span>
              {t("footer.aboutTitle")}
            </h3>
            <p className="text-sm mb-4">{t("footer.aboutDescription")}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t("footer.quickLinksTitle")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {t("footer.quickLinks.home")}
                </a>
              </li>
              <li>
                <a href="#route-finder" className="hover:text-yellow-400 transition-colors">
                  {t("footer.quickLinks.routeFinder")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {t("footer.quickLinks.fareCalculator")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {t("footer.quickLinks.metroMap")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {t("footer.quickLinks.timings")}
                </a>
              </li>
            </ul>
          </div>

          {/* Metro Lines Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t("footer.metroLinesTitle")}
            </h4>
            <div className="space-y-4">
              {metroLines.map((line, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        line.name.includes("Blue") ? "bg-blue-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium">{line.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {line.stations} stations • {line.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t("footer.contactUsTitle")}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-400" />
                <span>{t("footer.address")}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-yellow-400" />
                <span>{t("footer.phone")}</span>
              </div>
              <div className="flex items-center">
                <MdEmail className="mr-2 text-yellow-400" />
                <span>{t("footer.email")}</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-white mb-2">{t("footer.subscribeTitle")}</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("footer.subscribePlaceholder")}
                  className="px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none w-full"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r-lg transition-colors">
                  {t("footer.subscribeButton")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{t("footer.copyright", { year: currentYear })}</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-yellow-400">
                {t("footer.privacyPolicy")}
              </a>
              <a href="#" className="hover:text-yellow-400">
                {t("footer.termsOfService")}
              </a>
              <a href="#" className="hover:text-yellow-400">
                {t("footer.sitemap")}
              </a>
            </div>
          </div>
          <p className="mt-4 text-gray-500">{t("footer.developedBy")}</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
