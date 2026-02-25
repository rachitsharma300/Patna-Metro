import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import api from "../services/api";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import AnimatedMetro from "./metro/AnimatedMetro";
import { useTranslation } from "react-i18next";
import RouteForm from "./Journey/RouteForm";
import JourneySummary from "./Journey/JourneySummary";
import RouteStations from "./Journey/RouteStations";
import {
  FaClock,
  FaExchangeAlt,
  FaTrain,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaCheckCircle,
  FaSubway,
  FaStar,
  FaRoute
} from "react-icons/fa";
import { MdTransitEnterexit } from "react-icons/md";

const RouteFinder = forwardRef(({ source, destination }, ref) => {
  const { t } = useTranslation();
  const [stations, setStations] = useState([]); // List of all stations
  const [selected, setSelected] = useState({
    source: source || "",
    destination: destination || "",
  }); // Selected source/destination
  const [route, setRoute] = useState([]); // Complete route data
  const [loading, setLoading] = useState(false);
  const [journeyDetails, setJourneyDetails] = useState(null); // Time, fare, station count etc.
  const [error, setError] = useState(null);

  // Expose the triggerSearch method via ref
  useImperativeHandle(ref, () => ({
    triggerSearch: () => {
      getRoute();
    },
  }));

  // Update selected source/destination when props change
  useEffect(() => {
    setSelected({ source, destination });
  }, [source, destination]);

  // Fetch all details needed for a journey in parallel
  const fetchJourneyDetails = async () => {
    try {
      const [routeRes, timeRes, fareRes] = await Promise.all([
        api.get(
          `/stations/route?source=${selected.source}&destination=${selected.destination}`
        ),
        api.get(
          `/estimated-time?source=${selected.source}&destination=${selected.destination}`
        ),
        api.get(
          `/fare?source=${selected.source}&destination=${selected.destination}`
        ),
      ]);

      return {
        route: routeRes.data,
        time: Math.round(timeRes.data.estimated_time_minutes),
        fare: fareRes.data,
        stationsCount: Math.max(routeRes.data.length - 1, 0),
      };
    } catch (error) {
      console.error("Error fetching journey details:", error);
      throw error;
    }
  };

  // Get complete route and set the states
  const getRoute = async () => {
    if (!selected.source || !selected.destination) {
      setError("Please select both source and destination stations");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const details = await fetchJourneyDetails();
      setRoute(details.route);
      setJourneyDetails({
        time: details.time,
        fare: details.fare,
        stationsCount: details.stationsCount,
      });
    } catch (error) {
      setError("Failed to get route details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update selected source/destination manually
  const handleSelect = (field, value) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
    setJourneyDetails(null);
    setError(null);
  };

  // Swap source and destination
  const reverseRoute = () => {
    setSelected((prev) => ({
      source: prev.destination,
      destination: prev.source,
    }));
    setRoute([]);
    setJourneyDetails(null);
    setError(null);
  };

  // Load station list on component mount
  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const response = await api.get("/stations");
        setStations(response.data);
      } catch (err) {
        setError("Failed to load stations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  return (
    <>
      <div className="pt-28 pb-12 bg-gray-50/50">
        {/* Metro banner */}
        <div className="flex justify-center mb-8 w-full max-w-2xl mx-auto overflow-hidden">
          <AnimatedMetro />
        </div>

        {/* Main route card */}
        <motion.div
          id="route-finder"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-12 max-w-3xl mx-auto border border-gray-100 relative z-10"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-50 p-3 rounded-2xl mr-4">
              <FaRoute className="text-2xl text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-[#0B3D91] to-[#1a4ca3] bg-clip-text text-transparent">
              {t("hero.cta")}
            </h2>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Form section */}
          <RouteForm
            stations={stations}
            selected={selected}
            loading={loading}
            onSelectChange={handleSelect}
            onFindRoute={getRoute}
            onReverseRoute={reverseRoute}
          />

          {/* Journey summary */}
          <AnimatePresence>
            {journeyDetails && (
              <JourneySummary
                time={journeyDetails.time}
                fare={journeyDetails.fare}
                stationsCount={journeyDetails.stationsCount}
                route={route}
              />
            )}
          </AnimatePresence>

          {/* Station list */}
          <AnimatePresence>
            {route.length > 0 && <RouteStations route={route} />}
          </AnimatePresence>
        </motion.div>

        {/* Additional Info Grid */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Service Timings Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all"
            >
              <div className="flex items-center mb-6 border-b border-gray-50 pb-4">
                <div className="bg-amber-50 p-2.5 rounded-xl mr-3">
                  <FaClock className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-[#0B3D91] text-xl font-bold">
                  {t("serviceTimings")}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 font-medium">{t("firstTrain")}</span>
                  <span className="text-gray-900 font-bold bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">6:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-50">
                  <span className="text-gray-500 font-medium">{t("lastTrain")}</span>
                  <span className="text-gray-900 font-bold bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">10:30 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-50">
                  <span className="text-gray-500 font-medium">{t("frequency")}</span>
                  <span className="text-blue-600 font-bold py-1.5 px-4 bg-blue-50 rounded-xl border border-blue-100">
                    5–7 {t("mins")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Key Interchanges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all"
            >
              <div className="flex items-center mb-6 border-b border-gray-50 pb-4">
                <div className="bg-blue-50 p-2.5 rounded-xl mr-3">
                  <FaExchangeAlt className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-[#0B3D91] text-xl font-bold">
                  {t("keyInterchanges")}
                </h3>
              </div>

              <div className="space-y-5">
                {/* Patna Junction */}
                <div className="flex items-start group">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                    <FaSubway className="text-blue-600 group-hover:text-white transition-colors" size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-bold mb-1">{t("stations.Patna Junction")}</h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 shadow-sm"></div>
                        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{t("blueLine")}</span>
                      </div>
                      <div className="text-gray-300">|</div>
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2 shadow-sm"></div>
                        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{t("redLine")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Khemnichak */}
                <div className="flex items-start group border-t border-gray-50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                    <FaTrain className="text-blue-600 group-hover:text-white transition-colors" size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-bold mb-1">{t("stations.Khemni Chak")}</h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2 shadow-sm"></div>
                        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{t("blueLine")}</span>
                      </div>
                      <div className="text-gray-300">|</div>
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2 shadow-sm"></div>
                        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{t("redLine")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Stats Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center">
              <span className="bg-blue-600 w-2 h-8 rounded-full mr-4"></span>
              {t("metroStats.title")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type Grid */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <FaArrowCircleUp className="text-amber-600 text-2xl mr-3" />
                    <span className="text-amber-900 font-black tracking-tight">{t("metroStats.elevated")}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-gray-900 mr-2">13</span>
                    <span className="text-amber-800/60 font-bold text-sm uppercase tracking-widest">{t("metroStats.stations")}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <FaArrowCircleDown className="text-blue-600 text-2xl mr-3" />
                    <span className="text-blue-900 font-black tracking-tight">{t("metroStats.underground")}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-gray-900 mr-2">13</span>
                    <span className="text-blue-800/60 font-bold text-sm uppercase tracking-widest">{t("metroStats.stations")}</span>
                  </div>
                </div>

                <div className="col-span-2 bg-gray-900 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center text-white shadow-2xl">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <div className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{t("metroStats.totalLength")}</div>
                    <div className="text-4xl font-black">32.5 <span className="text-lg opacity-50 font-medium">{t("metroStats.km")}</span></div>
                  </div>
                  <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <div className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{t("metroStats.totalStations")}</div>
                    <div className="text-4xl font-black">26</div>
                  </div>
                  <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
                  <div className="text-center md:text-left">
                    <div className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{t("metroStats.corridors")}</div>
                    <div className="text-4xl font-black">2</div>
                  </div>
                </div>
              </div>

              {/* Busiest Stations */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                  <FaStar className="text-yellow-500 text-xl mr-3" />
                  <h4 className="text-[#0B3D91] font-black">{t("metroStats.busiestStations")}</h4>
                </div>
                <div className="space-y-4">
                  {['Patna Junction', 'Gandhi Maidan', 'PMCH', 'Patna Zoo', 'New ISBT'].map((station, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="bg-blue-50 w-8 h-8 rounded-lg flex items-center justify-center mr-3 mt-1 shrink-0 group-hover:bg-blue-600 transition-colors">
                        <FaCheckCircle className="text-blue-600 text-xs group-hover:text-white" />
                      </div>
                      <div>
                        <div className="text-gray-900 font-bold text-sm tracking-tight">{t(`stations.${station}`)}</div>
                        <div className="text-gray-400 text-[10px] leading-tight mt-0.5">{t(`stationsDesc.${station.replace(/\s+/g, '')}`)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default RouteFinder;
