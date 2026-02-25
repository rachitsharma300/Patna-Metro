import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import StationCard from "../StationCard";
import StationTrack from "../StationTrack";
import { InterchangeIcon } from "../metro/InterchangeIcon";
import { useTranslation } from "react-i18next";

const RouteStations = ({ route }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Your Journey Route
      </h3>

      <div className="space-y-4">
        {route.map((station, index) => {
          const nextStation = route[index + 1];
          const prevStation = route[index - 1];

          // Skip if this is the second entry of a duplicated interchange station
          if (prevStation && station.name === prevStation.name) {
            return null;
          }

          // Check if this is an interchange (line changes between current and next station)
          const isInterchange = nextStation && station.line !== nextStation.line;

          return (
            <React.Fragment key={station.id || index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <StationCard
                  station={{
                    ...station,
                    name: t(`stations.${station.name}`, station.name),
                  }}
                />

                {isInterchange && (
                  <div className="flex flex-col items-center space-y-1 mt-4 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center space-x-2">
                      <InterchangeIcon animated={true} />
                      <p className="text-sm font-bold text-blue-700">
                        {t("interchangeStation")}
                      </p>
                    </div>
                    <p className="text-xs text-blue-500">
                      {t("switchLines", {
                        from: t(station.line === "Blue Line" ? "blueLine" : "redLine"),
                        to: t(nextStation.line === "Blue Line" ? "blueLine" : "redLine")
                      })}
                    </p>
                  </div>
                )}

                {index < route.length - 1 && !isInterchange && <StationTrack />}
                {isInterchange && index < route.length - 2 && <StationTrack />}
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default RouteStations;
