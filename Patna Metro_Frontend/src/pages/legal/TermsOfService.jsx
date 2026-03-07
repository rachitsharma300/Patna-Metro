import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaFileContract, FaCheckCircle, FaExclamationTriangle, FaBalanceScale, FaEdit } from "react-icons/fa";

function TermsOfService() {
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
            <FaFileContract className="text-4xl" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#0B3D91] mb-4"
          >
            {t('terms.title')}
          </motion.h1>
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
          ></motion.div>
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
              <FaCheckCircle className="text-blue-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('terms.section1Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10">
              {t('terms.section1Text')}
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-green-500 rounded-l-3xl"></div>
            <div className="flex items-center mb-4">
              <FaBalanceScale className="text-green-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('terms.section2Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10">
              {t('terms.section2Text')}
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500 rounded-l-3xl"></div>
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('terms.section3Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10">
              {t('terms.section3Text')}
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 left-0 w-2 h-full bg-orange-500 rounded-l-3xl"></div>
            <div className="flex items-center mb-4">
              <FaEdit className="text-orange-500 text-2xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">{t('terms.section4Title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-10">
              {t('terms.section4Text')}
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default TermsOfService;