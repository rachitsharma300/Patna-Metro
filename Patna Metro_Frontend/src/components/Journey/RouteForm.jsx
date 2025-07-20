import React from "react";
import { motion } from "framer-motion";
import {
  FaExchangeAlt,
  FaSearch,
  FaMapMarkerAlt,
  FaFlagCheckered,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const RouteForm = ({
  stations,
  selected,
  loading,
  onSelectChange,
  onFindRoute,
  onReverseRoute,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl">
      {/* Source & Destination with Reverse Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col md:flex-row items-center gap-6"
      >
        {/* Source Station */}
        <motion.div
          whileHover={{ y: -5 }}
          className="flex-1 w-full bg-white p-4 rounded-xl shadow-md border border-gray-200"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-red-500 text-lg" />
            <span className="font-bold text-gray-800">
              {t("RouteFinder.sourceStation")}
            </span>
          </label>
          <div className="relative">
            <select
              onChange={(e) => onSelectChange("source", e.target.value)}
              value={selected.source}
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white font-medium"
            >
              <option value="">{t("RouteFinder.selectSource")}</option>
              {stations.map((st) => (
                <option key={st.id} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaMapMarkerAlt />
            </div>
          </div>
        </motion.div>

        {/* Reverse Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute md:relative bottom-0 md:bottom-auto transform md:translate-y-0 -translate-y-1/2 z-10"
        >
          <button
            onClick={onReverseRoute}
            className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Reverse stations"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="text-white text-xl"
            >
              <FaExchangeAlt />
            </motion.div>
          </button>
        </motion.div>

        {/* Destination Station */}
        <motion.div
          whileHover={{ y: -5 }}
          className="flex-1 w-full bg-white p-4 rounded-xl shadow-md border border-gray-200 mt-12 md:mt-0"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaFlagCheckered className="mr-2 text-green-500 text-lg" />
            <span className="font-bold text-gray-800">
              {t("RouteFinder.destinationStation")}
            </span>
          </label>
          <div className="relative">
            <select
              onChange={(e) => onSelectChange("destination", e.target.value)}
              value={selected.destination}
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white font-medium"
            >
              <option value="">{t("RouteFinder.selectDestination")}</option>
              {stations.map((st) => (
                <option key={st.id} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaFlagCheckered />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Find Route Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center pt-4"
      >
        <motion.button
          onClick={onFindRoute}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className={`flex items-center px-8 py-4 rounded-full text-white font-bold tracking-wide transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          }`}
        >
          {loading ? (
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center"
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("RouteFinder.calculatingRoute")}
            </motion.span>
          ) : (
            <motion.span
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center"
            >
              <FaSearch className="mr-3 text-lg" />
              <motion.span
                animate={{
                  textShadow: ["0 0 0px #fff", "0 0 5px #fff", "0 0 0px #fff"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("RouteFinder.findRoute")}
              </motion.span>
            </motion.span>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RouteForm;
