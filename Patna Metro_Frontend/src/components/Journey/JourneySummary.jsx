import React from "react";
import { FaClock, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";

const JourneySummary = ({ time, fare, stationsCount }) => {
  return (
    <div className="mt-8 bg-blue-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Journey Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          icon={<FaClock className="text-blue-600" />}
          title="Estimated Time"
          value={`${time} minutes`}
          bgColor="bg-blue-100"
        />
        <SummaryCard
          icon={<FaRupeeSign className="text-green-600" />}
          title="Approximate Fare"
          value={`₹${fare.toFixed(2)}`}
          bgColor="bg-green-100"
        />
        <SummaryCard
          icon={<FaMapMarkerAlt className="text-purple-600" />}
          title="Stations Count"
          value={`${stationsCount} stations`}
          bgColor="bg-purple-100"
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, title, value, bgColor }) => (
  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
    <div className={`p-2 ${bgColor} rounded-full`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default JourneySummary;
