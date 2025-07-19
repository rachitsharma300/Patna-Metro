import React, { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExchangeAlt,
  FaSearch,
  FaTrain,
  FaClock,
  FaRupeeSign,
  FaMapMarkerAlt,
} from "react-icons/fa";
import StationCard from "./StationCard";

// Import your SVG
import MetroTrain from "../assets/Metro.svg";

function RouteFinder() {
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState({ source: "", destination: "" });
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [journeyDetails, setJourneyDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const response = await api.get("/stations");
        setStations(response.data);
      } catch (err) {
        setError("Failed to load stations. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  const handleSelect = (field, value) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
    setJourneyDetails(null);
    setError(null);
  };

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
        stationsCount: routeRes.data.length,
      };
    } catch (error) {
      console.error("Error fetching journey details:", error);
      throw error;
    }
  };

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reverseRoute = () => {
    setSelected((prev) => ({
      source: prev.destination,
      destination: prev.source,
    }));
    setRoute([]);
    setJourneyDetails(null);
    setError(null);
  };

  return (
    <>
      {/* Metro SVG late add some CSS Properties.. */}
      <div className="flex justify-center my-4">
        <img src={MetroTrain} alt="Moving Metro Train" className="w-100" />
      </div>
      {/*  style={{ width: "800px", height: "auto" }} */}

      {/* Route Finder Component */}
      <motion.div
        id="route-finder"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-6 my-10 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center mb-6">
          <FaTrain className="text-3xl text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Route Finder
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source Station
              </label>
              <select
                onChange={(e) => handleSelect("source", e.target.value)}
                value={selected.source}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Source</option>
                {stations.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination Station
              </label>
              <select
                onChange={(e) => handleSelect("destination", e.target.value)}
                value={selected.destination}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select Destination</option>
                {stations.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={getRoute}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className={`flex items-center px-6 py-3 rounded-lg shadow-md text-white font-medium ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} transition-all`}
            >
              {loading ? (
                "Finding..."
              ) : (
                <>
                  <FaSearch className="mr-2" /> Find Route
                </>
              )}
            </motion.button>

            <motion.button
              onClick={reverseRoute}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-all"
            >
              <FaExchangeAlt className="mr-2" /> Reverse
            </motion.button>
          </div>
        </div>

        {/* Journey Summary Section */}
        <AnimatePresence>
          {journeyDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-blue-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Journey Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FaClock className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Time</p>
                    <p className="font-semibold">
                      {journeyDetails.time} minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="p-2 bg-green-100 rounded-full">
                    <FaRupeeSign className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Approximate Fare</p>
                    <p className="font-semibold">
                      ₹{journeyDetails.fare.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <FaMapMarkerAlt className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stations Count</p>
                    <p className="font-semibold">
                      {journeyDetails.stationsCount} stations
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Route Stations Section */}
        <AnimatePresence>
          {route.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Your Journey Route
              </h3>
              <div className="space-y-4">
                {route.map((st, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <StationCard station={st} />
                    {idx < route.length - 1 && (
                      <div className="h-6 w-0.5 bg-gray-300 my-1"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default RouteFinder;
