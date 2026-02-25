import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaCalculator,
  FaInfoCircle,
  FaRupeeSign,
  FaPhoneAlt,
  FaLightbulb,
  FaArrowRight,
  FaExchangeAlt,
  FaSubway,
  FaMapMarkerAlt,
  FaShieldAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

const FareInfo = () => {
  const { t } = useTranslation();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [calculatedFare, setCalculatedFare] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await api.get("/stations");
        setStations(response.data);
      } catch (err) {
        console.error("Failed to load stations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  const calculateActualFare = (from, to, list) => {
    if (!from || !to || !list.length) return null;
    const fromIndex = list.findIndex(s => (typeof s === 'string' ? s : s.name) === from);
    const toIndex = list.findIndex(s => (typeof s === 'string' ? s : s.name) === to);
    if (fromIndex === -1 || toIndex === -1) return null;
    const diff = Math.abs(fromIndex - toIndex);
    if (diff <= 2) return 10;
    if (diff <= 5) return 20;
    if (diff <= 8) return 30;
    if (diff <= 12) return 40;
    return 50;
  };

  const handleCalculate = () => {
    const fare = calculateActualFare(fromStation, toStation, stations);
    setCalculatedFare(fare);
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
    setCalculatedFare(null);
  };

  const emergencyContacts = [
    { name: "Police Control Room", number: "100", desc: "Patna Police - Emergency", color: "blue" },
    { name: "Ambulance", number: "102", desc: "Emergency Medical Services", color: "red" },
    { name: "Fire Brigade", number: "101", desc: "Fire & Rescue Services", color: "orange" },
    { name: "Patna Metro Control", number: "1800-123-4567", desc: "Metro Emergency & Info", color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-transparent pt-20 pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0B3D91] to-[#1a4ca3] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t("fareInfoPage.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {t("fareInfoPage.subtitle")}
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Column - Calculator & Structure */}
          <div className="lg:col-span-2 space-y-8">

            {/* Fare Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-[#0B3D91]/10 p-3 rounded-2xl">
                  <FaCalculator className="text-[#0B3D91] text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{t("fareInfoPage.fareCalculator")}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 relative">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                    {t("fareInfoPage.fromStation")}
                  </label>
                  <select
                    value={fromStation}
                    onChange={(e) => { setFromStation(e.target.value); setCalculatedFare(null); }}
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#0B3D91] outline-none transition-all appearance-none"
                  >
                    <option value="">{t("fareInfoPage.selectStation")}</option>
                    {stations.map((s, i) => (
                      <option key={i} value={typeof s === 'string' ? s : s.name}>
                        {typeof s === 'string' ? s : s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                    {t("fareInfoPage.toStation")}
                  </label>
                  <select
                    value={toStation}
                    onChange={(e) => { setToStation(e.target.value); setCalculatedFare(null); }}
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#0B3D91] outline-none transition-all appearance-none"
                  >
                    <option value="">{t("fareInfoPage.selectStation")}</option>
                    {stations.map((s, i) => (
                      <option key={i} value={typeof s === 'string' ? s : s.name}>
                        {typeof s === 'string' ? s : s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {fromStation && toStation && (
                  <button
                    onClick={swapStations}
                    className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 md:top-1/2 bg-white shadow-lg p-3 rounded-full text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white transition-all z-10"
                  >
                    <FaExchangeAlt />
                  </button>
                )}
              </div>

              <button
                onClick={handleCalculate}
                disabled={!fromStation || !toStation}
                className={`w-full mt-8 p-4 rounded-2xl font-bold text-lg transition-all ${!fromStation || !toStation
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#0B3D91] text-white shadow-lg hover:shadow-[#0B3D91]/30 active:scale-[0.98]"
                  }`}
              >
                {t("fareInfoPage.calculateFare")}
              </button>

              <AnimatePresence>
                {calculatedFare !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 p-6 bg-green-50 rounded-3xl border border-green-100 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500 text-white p-3 rounded-2xl">
                        <FaRupeeSign className="text-xl" />
                      </div>
                      <div>
                        <p className="text-green-800/60 text-xs font-bold uppercase tracking-widest">Estimated Fare</p>
                        <p className="text-3xl font-black text-green-600">₹{calculatedFare}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-800/60 text-[10px] uppercase font-bold tracking-tighter">Valid until</p>
                      <p className="text-green-800 font-bold text-sm">Next Notification</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Fare Structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-2xl">
                  <FaInfoCircle className="text-[#0B3D91] text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{t("fareInfoPage.fareStructure")}</h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">{t("fareInfoPage.distanceRange")}</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">{t("fareInfoPage.fare")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { range: "0-2 km", fare: 10 },
                      { range: "2-5 km", fare: 20 },
                      { range: "5-8 km", fare: 30 },
                      { range: "8-12 km", fare: 40 },
                      { range: "12+ km", fare: 50 },
                    ].map((slab, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-700">{slab.range}</td>
                        <td className="p-4 font-black text-[#0B3D91] text-right text-lg">₹{slab.fare}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Emergency & Tips */}
          <div className="space-y-8">

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-6 border-l-8 border-red-500 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-red-50 p-2.5 rounded-2xl">
                  <FaPhoneAlt className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t("fareInfoPage.emergencyHelpline")}</h3>
              </div>
              <div className="space-y-4">
                {emergencyContacts.map((contact, i) => (
                  <div key={i} className="group p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">{contact.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-gray-800">{contact.number}</span>
                      <a href={`tel:${contact.number}`} className="bg-white p-2 rounded-full shadow-sm text-red-600 hover:scale-110 transition-transform">
                        <FaPhoneAlt size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Travel Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#0B3D91] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FaLightbulb size={120} />
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <FaLightbulb className="text-yellow-400" />
                <h3 className="text-xl font-bold">{t("fareInfoPage.smartTravel")}</h3>
              </div>
              <ul className="space-y-4 text-sm relative z-10">
                {[
                  "Use Smart Card for 10% instant discount.",
                  "Daily Pass is best for multiple journeys.",
                  "Avoid traveling with heavy luggage during peak hours.",
                  "Front coaches are usually less crowded."
                ].map((tip, i) => (
                  <li key={i} className="flex space-x-3 items-start">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span className="text-white/80 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Facts Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                <FaSubway className="mr-2 text-blue-600" /> {t("fareInfoPage.quickFacts")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg"><FaMapMarkerAlt className="text-blue-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700">{t("fareInfoPage.operatingHours")}</h4>
                    <p className="text-xs text-gray-500">{t("fareInfoPage.operatingTime")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg"><FaShieldAlt className="text-blue-500" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700">{t("fareInfoPage.childPolicy")}</h4>
                    <p className="text-xs text-gray-500">{t("fareInfoPage.freeForKids")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FareInfo;
