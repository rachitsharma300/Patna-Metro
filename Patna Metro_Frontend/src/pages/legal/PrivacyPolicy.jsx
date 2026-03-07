import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUserSecret, FaLock, FaSync } from "react-icons/fa";

function PrivacyPolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
          >
            <FaShieldAlt className="text-4xl" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#0B3D91] mb-4"
          >
            {t('privacyPolicy.title')}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t('privacyPolicy.intro')}
          </motion.p>
        </div>

        {/* Content Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 rounded-l-3xl"></div>
            <div className="flex items-center mb-4">
              <FaUserSecret className="text-blue-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.section1Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10">
              {t('privacyPolicy.section1Text')}
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-green-500 rounded-l-3xl"></div>
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-green-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.section2Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10 mb-4">
              {t('privacyPolicy.section2Text')}
            </p>
            <ul className="list-none space-y-3 ml-10">
              {[
                t('privacyPolicy.section2List1'),
                t('privacyPolicy.section2List2'),
                t('privacyPolicy.section2List3')
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 shrink-0"></span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed ml-10 mt-4 font-medium">
              {t('privacyPolicy.section2Text2')}
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 rounded-l-3xl"></div>
            <div className="flex items-center mb-4">
              <FaLock className="text-purple-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.section3Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10">
              {t('privacyPolicy.section3Text')}
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-orange-500 rounded-l-3xl"></div>
            <div className="flex items-center mb-4">
              <FaSync className="text-orange-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('privacyPolicy.section4Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10">
              {t('privacyPolicy.section4Text')}
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;