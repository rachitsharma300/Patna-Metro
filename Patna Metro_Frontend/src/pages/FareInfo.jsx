// src/pages/FareInfo.jsx
import React from "react";
import { useLanguage } from "../utils/LanguageContext";
import { metroData } from "../utils/metroData";

function FareInfo() {
  const { t } = useLanguage();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t("fareInformation")}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">{t("distance")}</th>
              <th className="py-2 px-4 text-left">{t("fare")}</th>
            </tr>
          </thead>
          <tbody>
            {metroData.fareSlabs.map((slab, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4">{slab.range}</td>
                <td className="py-2 px-4">₹{slab.fare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FareInfo;
