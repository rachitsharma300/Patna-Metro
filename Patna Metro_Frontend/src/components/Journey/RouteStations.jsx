import React from "react";
import { motion } from "framer-motion";
import StationCard from "../StationCard";
import StationTrack from "../StationTrack";
import { InterchangeIcon } from "../metro/InterchangeIcon";

const RouteStations = ({ route }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Your Journey Route
      </h3>

      <div className="space-y-4">
        {route.map((station, index) => {
          const nextStation = route[index + 1];
          const isInterchange = nextStation && station.line !== nextStation.line;

          return (
            <React.Fragment key={station.id || index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <StationCard station={station} />

                {isInterchange && (
                  <div className="flex flex-col items-center space-y-1 mt-2">
                    <InterchangeIcon animated={false} />
                    <p className="text-xs font-semibold text-yellow-600">
                      Interchange to {nextStation.line}
                    </p>
                  </div>
                )}

                {index < route.length - 1 && <StationTrack />}
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default RouteStations;
