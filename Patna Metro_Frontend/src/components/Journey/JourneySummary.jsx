import React from "react";
import { FaClock, FaRupeeSign, FaTrain } from "react-icons/fa";

function JourneySummary({ time, fare, stationsCount }) {
  return (
    <div className="flex flex-col items-center space-y-4 py-4 w-full">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md px-6 py-4 w-full max-w-sm">
        <h3 className="text-center text-xl font-bold text-gray-800 mb-3">
          Journey Summary
        </h3>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <FaClock className="text-blue-600" />
            <span className="text-gray-700 font-semibold">Time:</span>
          </div>
          <span className="text-gray-800">{time} min</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <FaRupeeSign className="text-green-600" />
            <span className="text-gray-700 font-semibold">Fare:</span>
          </div>
          <span className="text-gray-800">₹{fare}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaTrain className="text-red-600" />
            <span className="text-gray-700 font-semibold">Stations:</span>
          </div>
          <span className="text-gray-800">{stationsCount}</span>
        </div>
      </div>
    </div>
  );
}

export default JourneySummary;
