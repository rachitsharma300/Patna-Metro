import React, { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import MetroTrain from "../assets/Metro.svg";
import { useTranslation } from "react-i18next";
import RouteForm from "./journey/RouteForm";
import JourneySummary from "./journey/JourneySummary";
import RouteStations from "./journey/RouteStations";

function RouteFinder() {
  const { t } = useTranslation();
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
        api.get(`/stations/route?source=${selected.source}&destination=${selected.destination}`),
        api.get(`/estimated-time?source=${selected.source}&destination=${selected.destination}`),
        api.get(`/fare?source=${selected.source}&destination=${selected.destination}`),
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
      {/* Metro SVG */}
      <div className="flex justify-center my-4">
        <img src={MetroTrain} alt="Moving Metro Train" className="w-100" />
      </div>

      {/* Route Finder */}
      <motion.div
        id="route-finder"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-6 my-10 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            {t("routeFinder")}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Route Form */}
        <RouteForm
          stations={stations}
          selected={selected}
          loading={loading}
          onSelectChange={handleSelect}
          onFindRoute={getRoute}
          onReverseRoute={reverseRoute}
        />

        {/* Journey Summary */}
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

        {/* Route Stations */}
        <AnimatePresence>
          {route.length > 0 && <RouteStations route={route} />}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default RouteFinder;
