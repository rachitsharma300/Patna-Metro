import React, { useState } from 'react';
import { FaTrain, FaExchangeAlt } from 'react-icons/fa';

const PatnaMetroMap = () => {
  // Station coordinates (x, y) for the SVG
  const stations = {
    redLine: [
      { name: "Danapur Cantonment", x: 50, y: 50 },
      { name: "Saguna Mor", x: 50, y: 100 },
      { name: "RPS Mor", x: 50, y: 150 },
      { name: "Patlipura", x: 50, y: 200 },
      { name: "Rukanpura", x: 50, y: 250 },
      { name: "Raja Bazar", x: 50, y: 300 },
      { name: "Patna Zoo", x: 50, y: 350 },
      { name: "Vikas Bhawan", x: 50, y: 400 },
      { name: "Vidyut Bhawan", x: 50, y: 450 },
      { name: "Patna Junction", x: 50, y: 500, interchange: true },
      { name: "CNLU", x: 50, y: 550 },
      { name: "Mithapur", x: 50, y: 600 },
      { name: "Ramkrishna Nagar", x: 50, y: 650 },
      { name: "Jahanpura", x: 50, y: 700 },
      { name: "Khemni Chak", x: 50, y: 750 }
    ],
    blueLine: [
      { name: "Akashvani", x: 200, y: 300 },
      { name: "Gandhi Maidan", x: 200, y: 350 },
      { name: "PMCH", x: 200, y: 400 },
      { name: "University", x: 200, y: 450 },
      { name: "Moin-ul-Haq Stadium", x: 200, y: 500 },
      { name: "Rajendra Nagar", x: 200, y: 550 },
      { name: "Malahi Pakri", x: 200, y: 600 },
      { name: "Bhootnath", x: 200, y: 650 },
      { name: "Zero Mile", x: 200, y: 700 },
      { name: "New ISBT", x: 200, y: 750 }
    ]
  };

  const [selectedStation, setSelectedStation] = useState(null);
  const [hoveredStation, setHoveredStation] = useState(null);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Patna Metro Map</h2>
      
      {/* Interactive SVG Map */}
      <div className="relative">
        <svg 
          width="100%" 
          height="800" 
          viewBox="0 0 250 800" 
          className="border border-gray-200 rounded-lg"
        >
          {/* Red Line Path */}
          <path
            d={`M ${stations.redLine.map(s => `${s.x},${s.y}`).join(' L ')}`}
            stroke="#E53E3E"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Blue Line Path */}
          <path
            d={`M ${stations.blueLine.map(s => `${s.x},${s.y}`).join(' L ')}`}
            stroke="#3182CE"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Connection Line */}
          <path
            d="M 50,500 L 200,500"
            stroke="#805AD5"
            strokeWidth="6"
            strokeDasharray="5,5"
          />

          {/* Stations */}
          {[...stations.redLine, ...stations.blueLine].map((station) => (
            <g 
              key={station.name}
              onMouseEnter={() => setHoveredStation(station.name)}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => setSelectedStation(station)}
              className="cursor-pointer"
            >
              <circle
                cx={station.x}
                cy={station.y}
                r={station.interchange ? 10 : 8}
                fill={station.interchange ? "#805AD5" : stations.redLine.includes(station) ? "#E53E3E" : "#3182CE"}
                stroke="white"
                strokeWidth="2"
              />
              {station.interchange && (
                <FaExchangeAlt 
                  x={station.x - 6} 
                  y={station.y - 6}
                  width="12"
                  height="12"
                  fill="white"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Station Labels (outside SVG for better control) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...stations.redLine, ...stations.blueLine].map((station) => (
            <div
              key={`label-${station.name}`}
              className={`absolute px-2 py-1 rounded-md text-xs font-medium transition-all
                ${hoveredStation === station.name || selectedStation?.name === station.name 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-70 scale-100'}
                ${stations.redLine.includes(station) ? 'text-red-600' : 'text-blue-600'}
                ${station.interchange ? 'font-bold text-purple-700' : ''}`}
              style={{
                left: `${station.x + 15}px`,
                top: `${station.y - 10}px`,
                transform: hoveredStation === station.name ? 'translateX(5px)' : ''
              }}
            >
              {station.name}
            </div>
          ))}
        </div>
      </div>

      {/* Station Details Panel */}
      {selectedStation && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FaTrain className={
              stations.redLine.includes(selectedStation) 
                ? 'text-red-600' 
                : 'text-blue-600'
            }/>
            {selectedStation.name}
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Line</p>
              <p className="font-medium">
                {stations.redLine.includes(selectedStation) ? 'Red Line' : 'Blue Line'}
              </p>
            </div>
            {selectedStation.interchange && (
              <div>
                <p className="text-sm text-gray-500">Interchange</p>
                <p className="font-medium text-purple-600">Available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span className="text-sm">Red Line</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-600"></div>
          <span className="text-sm">Blue Line</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
            <FaExchangeAlt className="text-white text-xs" />
          </div>
          <span className="text-sm">Interchange</span>
        </div>
      </div>
    </div>
  );
};

export default PatnaMetroMap;