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
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Source Station */}
        <div className="flex-1 w-full bg-white p-4 rounded-xl shadow-md border border-gray-200">
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
        </div>

        {/* Reverse Button */}
        <motion.div
          // whileHover={{ scale: 1.1 }}
          // whileTap={{ scale: 0.9 }}
          // className="my-4 md:my-0"
          animate={{ rotateY: [0, 180, 0] }}
          transition={{ repeat: Infinity, duration: 6.0, ease: "linear" }}
          className="my-4 md:my-0"
        >
          <button
            // onClick={onReverseRoute}
            // className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            // aria-label="Reverse stations"
            onClick={onReverseRoute}
            className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Reverse stations"
          >
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="text-white text-xl"
            >
              <FaExchangeAlt className="text-white text-xl" />
              {/* <FaExchangeAlt /> */}
            </motion.div>
          </button>
        </motion.div>

        {/* Destination Station */}
        <div className="flex-1 w-full bg-white p-4 rounded-xl shadow-md border border-gray-200">
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
        </div>
      </div>

      {/* Find Route Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onFindRoute}
          disabled={loading}
          className={`flex items-center px-8 py-4 rounded-full text-white font-bold tracking-wide transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          }`}
        >
          <FaSearch className="mr-3 text-lg" />
          {loading
            ? t("RouteFinder.calculatingRoute")
            : t("RouteFinder.findRoute")}
        </button>
      </div>
    </div>
  );
};

export default RouteForm;
