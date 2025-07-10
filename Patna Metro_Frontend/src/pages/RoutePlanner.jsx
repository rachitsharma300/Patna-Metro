import { useState } from 'react';
import { FaExchangeAlt, FaTrain, FaMapMarkerAlt } from 'react-icons/fa';

const RoutePlanner = () => {
  // Corrected station data
  const metroLines = {
    redLine: [
      "Danapur Cantonment",
      "Saguna Mor",
      "RPS Mor",
      "Patlipura",
      "Rukanpura",
      "Raja Bazar",
      "Patna Zoo",
      "Vikas Bhawan",
      "Vidyut Bhawan",
      "Patna Junction",
      "CNLU",
      "Mithapur",
      "Ramkrishna Nagar",
      "Jahanpura",
      "Khemni Chak"
    ],
    blueLine: [
      "Akashvani",
      "Gandhi Maidan",
      "PMCH",
      "University",
      "Moin-ul-Haq Stadium",
      "Rajendra Nagar",
      "Malahi Pakri",
      "Bhootnath",
      "Zero Mile",
      "New ISBT"
    ]
  };

  const allStations = [...metroLines.redLine, ...metroLines.blueLine];
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [interchange, setInterchange] = useState(null);

  const findRoute = () => {
    if (!source || !destination) return;
    
    // Check if stations are on the same line
    const isRedLineSource = metroLines.redLine.includes(source);
    const isRedLineDest = metroLines.redLine.includes(destination);
    
    let path = [];
    
    // Same line journey
    if ((isRedLineSource && isRedLineDest) || 
        (!isRedLineSource && !isRedLineDest)) {
      const line = isRedLineSource ? metroLines.redLine : metroLines.blueLine;
      const startIdx = line.indexOf(source);
      const endIdx = line.indexOf(destination);
      
      if (startIdx < endIdx) {
        path = line.slice(startIdx, endIdx + 1);
      } else {
        path = line.slice(endIdx, startIdx + 1).reverse();
      }
      setInterchange(null);
    } 
    // Interchange at Patna Junction
    else {
      const redToBlue = isRedLineSource;
      const interchangeStation = "Patna Junction";
      
      // First leg (source to interchange)
      const firstLine = redToBlue ? metroLines.redLine : metroLines.blueLine;
      const firstStart = firstLine.indexOf(source);
      const firstEnd = firstLine.indexOf(interchangeStation);
      const firstPath = firstStart < firstEnd 
        ? firstLine.slice(firstStart, firstEnd + 1)
        : firstLine.slice(firstEnd, firstStart + 1).reverse();
      
      // Second leg (interchange to destination)
      const secondLine = redToBlue ? metroLines.blueLine : metroLines.redLine;
      const secondStart = secondLine.indexOf(interchangeStation);
      const secondEnd = secondLine.indexOf(destination);
      const secondPath = secondStart < secondEnd
        ? secondLine.slice(secondStart + 1, secondEnd + 1)
        : secondLine.slice(secondEnd, secondStart).reverse();
      
      path = [...firstPath, ...secondPath];
      setInterchange(interchangeStation);
    }
    
    setRoute(path);
  };

  const swapStations = () => {
    setSource(destination);
    setDestination(source);
    setRoute([]);
    setInterchange(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center dark:text-white">
          Patna Metro Route Planner
        </h1>
        
        {/* Station Selectors */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Source */}
            <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-gray-300">
                From
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select source</option>
                {allStations.map((station) => (
                  <option key={`source-${station}`} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapStations}
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                aria-label="Swap stations"
              >
                <FaExchangeAlt className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            
            {/* Destination */}
            <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-gray-300">
                To
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select destination</option>
                {allStations.map((station) => (
                  <option key={`dest-${station}`} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={findRoute}
            disabled={!source || !destination}
            className={`mt-6 w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
              !source || !destination
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white'
            } transition`}
          >
            <FaTrain />
            <span>Find Route</span>
          </button>
        </div>
        
        {/* Route Results */}
        {route.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Your Route
            </h2>
            
            <div className="space-y-3">
              {route.map((station, index) => (
                <div key={station} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    station === interchange
                      ? 'bg-purple-600'
                      : metroLines.redLine.includes(station)
                        ? 'bg-red-600'
                        : 'bg-blue-600'
                  }`}>
                    {station === interchange ? (
                      <FaExchangeAlt className="text-white" />
                    ) : (
                      <FaMapMarkerAlt className="text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-medium ${
                      station === interchange 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'dark:text-white'
                    }`}>
                      {station}
                      {station === interchange && (
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          (Interchange)
                        </span>
                      )}
                    </p>
                    {index < route.length - 1 && (
                      <div className={`h-6 w-0.5 ml-3.5 ${
                        route[index+1] === interchange || station === interchange
                          ? 'bg-purple-300'
                          : metroLines.redLine.includes(station) 
                            ? 'bg-red-300' 
                            : 'bg-blue-300'
                      }`}></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Route Summary */}
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium dark:text-white">Journey Summary:</h3>
              <ul className="mt-2 space-y-1 text-sm dark:text-gray-300">
                <li>• Total Stations: {route.length - 1}</li>
                {interchange && (
                  <li>• Interchange at: {interchange}</li>
                )}
                <li>• Line(s): {interchange ? 'Red & Blue' : metroLines.redLine.includes(source) ? 'Red' : 'Blue'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePlanner;