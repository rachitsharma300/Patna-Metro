import React from "react";
import metroMap from "../assets/PatnaMap.png";
import { useLanguage } from "../utils/LanguageContext";
import { InterchangeIcon } from "../components/metro/InterchangeIcon";
import { LineBadge } from "../components/metro/LineBadge";

export const MapPage = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{t("metroMap")}</h1>

      <div className="relative w-full max-w-4xl">
        {/* Simple Image Container */}
        <div className="bg-gray-100 rounded-lg p-2 mb-4">
          <img
            src={metroMap}
            alt={t("MetroMap")}
            className="w-full h-auto border border-gray-300 rounded-lg shadow-lg"
          />
        </div>

        {/* Map Legend */}
        <div className="bg-white/90 p-4 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <LineBadge line="Blue Line" />
              <span>{t("blueLine")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <LineBadge line="Red Line" />
              <span>{t("redLine")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <InterchangeIcon size={16} />
              <span>{t("interchange")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;