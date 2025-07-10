// src/pages/Routes.jsx
import { FaTrain, FaExchangeAlt, FaWarehouse } from "react-icons/fa";

const PatnaMetroRoutes = () => {
  const metroLines = {
    line1: {
      name: "Blue Line",
      color: "bg-blue-600",
      stations: [
        "Danapur Cantonment",
        "Saguna Mor",
        "RPS Mor",
        "Pattipura",
        "Rukanpura",
        "Raja Bazar",
        "Patna Zoo",
        "Vidyut Bhawano",
        "Vivas Bhawan",
        "Patna Junction",
        "CNLU",
        "Mithapur"
      ]
    },
    line2: {
      name: "Red Line",
      color: "bg-red-600",
      stations: [
        "Ramkrishna Nagar",
        "Jaganpura",
        "Khemni Chak",
        "Bhoothath",
        "Zeno Mile",
        "New ISBT Depot",
        "New ISBT"
      ]
    },
    specialStations: {
      interchange: ["Patna Junction"],
      depot: ["New ISBT Depot"]
    }
  };

  const renderStation = (station) => {
    const isInterchange = metroLines.specialStations.interchange.includes(station);
    const isDepot = metroLines.specialStations.depot.includes(station);

    return (
      <li key={station} className="flex items-center py-2">
        <div className={`w-4 h-4 rounded-full mr-3 
          ${isInterchange ? 'bg-purple-600' : 
             isDepot ? 'bg-yellow-500' : 'bg-gray-400'}`}
        />
        <span className="font-medium">{station}</span>
        {isInterchange && (
          <FaExchangeAlt className="ml-2 text-purple-600" title="Interchange" />
        )}
        {isDepot && (
          <FaWarehouse className="ml-2 text-yellow-500" title="Depot" />
        )}
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Patna Metro Routes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blue Line */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-full ${metroLines.line1.color} mr-3 flex items-center justify-center`}>
                <FaTrain className="text-white" />
              </div>
              <h2 className="text-xl font-bold dark:text-white">{metroLines.line1.name}</h2>
            </div>
            <ul className="space-y-1">
              {metroLines.line1.stations.map(renderStation)}
            </ul>
          </div>

          {/* Green Line */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-full ${metroLines.line2.color} mr-3 flex items-center justify-center`}>
                <FaTrain className="text-white" />
              </div>
              <h2 className="text-xl font-bold dark:text-white">{metroLines.line2.name}</h2>
            </div>
            <ul className="space-y-1">
              {metroLines.line2.stations.map(renderStation)}
            </ul>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Map Legend</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
              <span className="dark:text-gray-300">Regular Station</span>
            </li>
            <li className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
              <span className="dark:text-gray-300">Interchange Station</span>
            </li>
            <li className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <span className="dark:text-gray-300">Depot</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatnaMetroRoutes;