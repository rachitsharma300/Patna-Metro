import React from "react";
import { metroData } from "../utils/metroData";
import { useTranslation } from "react-i18next";

function FareInfo() {
  const { t } = useTranslation();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("fareInfoPage.title")}</h1>
        <p className="text-blue-100">{t("fareInfoPage.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            {t("fareInfoPage.fareStructure")}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">
                    {t("fareInfoPage.distanceRange")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">
                    {t("fareInfoPage.fare")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {metroData.fareSlabs.map((slab, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-blue-50"
                  >
                    <td className="py-3 px-4">{slab.range}</td>
                    <td className="py-3 px-4 font-medium text-blue-600">
                      ₹{slab.fare}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            {t("fareInfoPage.ticketOptions")}
          </h2>
          <ul className="space-y-3">
            {["smartCards", "dailyPass", "touristPass", "studentPass"].map(
              (key, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-3">
                    ✔️
                  </span>
                  <span>{t(`fareInfoPage.${key}`)}</span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            {t("fareInfoPage.quickFacts")}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">
                {t("fareInfoPage.operatingHours")}
              </h3>
              <p className="text-gray-600">{t("fareInfoPage.operatingTime")}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">
                {t("fareInfoPage.frequency")}
              </h3>
              <p className="text-gray-600">
                {t("fareInfoPage.frequencyDetail")}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">
                {t("fareInfoPage.firstLastTrain")}
              </h3>
              <p className="text-gray-600">{t("fareInfoPage.firstTrain")}</p>
              <p className="text-gray-600">{t("fareInfoPage.lastTrain")}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">
                {t("fareInfoPage.contact")}
              </h3>
              <p className="text-gray-600">{t("fareInfoPage.helpline")}</p>
              <p className="text-gray-600">{t("fareInfoPage.email")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {t("fareInfoPage.fareCalculator")}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              {t("fareInfoPage.fromStation")}
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>{t("fareInfoPage.selectStation")}</option>
              {metroData.stations.map((station, index) => (
                <option key={index}>{station}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              {t("fareInfoPage.toStation")}
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>{t("fareInfoPage.selectStation")}</option>
              {metroData.stations.map((station, index) => (
                <option key={index}>{station}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300">
              {t("fareInfoPage.calculateFare")}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-8">
        <div className="flex">
          <div className="flex-shrink-0">⚠️</div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              {t("fareInfoPage.importantNotice")}
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                {t("fareInfoPage.noticeDetails")}
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FareInfo;
