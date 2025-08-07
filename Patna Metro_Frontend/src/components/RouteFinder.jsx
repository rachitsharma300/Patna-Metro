import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import api from "../services/api";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import MetroTrain from "../assets/Metro.svg";
import { useTranslation } from "react-i18next";
import RouteForm from "./Journey/RouteForm";
import JourneySummary from "./journey/JourneySummary";
import RouteStations from "./Journey/RouteStations";

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
        stationsCount: routeRes.data.length,
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
      {/* Metro banner */}
      <div className="flex justify-center my-4">
        <img src={MetroTrain} alt="Metro" className="w-100" />
      </div>

      {/* Main route card */}
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
    </>
  );
});

export default RouteFinder;
