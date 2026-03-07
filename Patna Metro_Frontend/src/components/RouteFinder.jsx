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
  FaRoute,
  FaCloudSun,
  FaWind,
  FaTint,
  FaLeaf
} from "react-icons/fa";
import { fetchPatnaWeather } from "../services/weatherService";
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
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);

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
    
    const fetchWeather = async () => {
      const { success, weather: wData, aqi: aqiData } = await fetchPatnaWeather();
      if (success) {
        setWeather(wData);
        setAqi(aqiData);
      }
    };

    fetchStations();
    fetchWeather();
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

            {/* Live Patna Weather & AQI Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all"
            >
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <div className="flex items-center">
                  <div className="bg-sky-50 p-2.5 rounded-xl mr-3">
                    <FaCloudSun className="text-sky-500 text-xl" />
                  </div>
                  <h3 className="text-[#0B3D91] text-xl font-bold">
                    {t("weather.title")}
                  </h3>
                </div>
                {weather && (
                  <div className="text-3xl font-black text-gray-800 tracking-tighter">
                    {Math.round(weather.temperature_2m)}°<span className="text-lg text-gray-400 font-medium">C</span>
                  </div>
                )}
              </div>

              {!weather ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-50/50 rounded-2xl p-4 flex items-center border border-sky-100/50">
                    <div className="bg-white text-sky-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm border border-sky-100">
                      <FaTint />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">{t("weather.humidity")}</div>
                      <div className="text-gray-900 font-black text-lg">{weather.relative_humidity_2m}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-teal-50/50 rounded-2xl p-4 flex items-center border border-teal-100/50">
                    <div className="bg-white text-teal-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm border border-teal-100">
                      <FaWind />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">{t("weather.wind")}</div>
                      <div className="text-gray-900 font-black text-lg">{weather.wind_speed_10m} <span className="text-xs font-semibold text-gray-500">{t("weather.kmh")}</span></div>
                    </div>
                  </div>

                  <div className="col-span-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 flex items-center justify-between border border-emerald-100/50 mt-2">
                    <div className="flex items-center">
                      <div className="bg-white text-emerald-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm border border-emerald-100">
                        <FaLeaf />
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-800/60 font-black uppercase tracking-widest mb-0.5">{t("weather.aqi")}</div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-gray-900 font-black text-xl">{aqi?.us_aqi || "--"}</span>
                          <span className="font-semibold text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{t("weather.moderate")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">{t("weather.pm25")}</div>
                      <div className="text-gray-800 font-bold text-sm bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{aqi?.pm2_5 || "--"} µg/m³</div>
                    </div>
                  </div>
                </div>
              )}
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
                    <span className="text-4xl font-black text-gray-900 mr-2">22</span>
                    <span className="text-amber-800/60 font-bold text-sm uppercase tracking-widest">{t("metroStats.stations")}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <FaArrowCircleDown className="text-blue-600 text-2xl mr-3" />
                    <span className="text-blue-900 font-black tracking-tight">{t("metroStats.underground")}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-gray-900 mr-2">2</span>
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
                    <div className="text-4xl font-black">24</div>
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
