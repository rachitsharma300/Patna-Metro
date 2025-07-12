import { useState } from 'react';
import { FaSearch, FaTrain, FaExchangeAlt } from 'react-icons/fa';
import { metroLines } from '../utils/metroData';
import StationMarker from '../components/common/StationMarker';

const Stations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');

  const filteredStations = Object.values(metroLines)
    .flatMap(line => line.stations)
    .filter(station => 
      station.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.hi.includes(searchTerm)
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          {language === 'en' ? 'Station List' : 'स्टेशन सूची'}
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={language === 'en' ? 'Search stations...' : 'स्टेशन खोजें...'}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(metroLines).map(([lineId, line]) => (
            <div key={lineId} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div 
                className="p-4 font-semibold text-white"
                style={{ backgroundColor: line.color }}
              >
                {line.name[language]}
              </div>
              
              <div className="p-4">
                {line.stations
                  .filter(station => 
                    filteredStations.some(s => s.id === station.id)
                  )
                  .map((station, index) => (
                    <div 
                      key={station.id} 
                      className="flex items-center py-3 border-b border-gray-100 last:border-0"
                    >
                      <StationMarker
                        lineColor={line.color}
                        isInterchange={station.isInterchange}
                        size="small"
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          {station[language]}
                        </div>
                        {station.isInterchange && (
                          <div className="text-xs text-gray-500 flex items-center">
                            <FaExchangeAlt className="mr-1" />
                            {language === 'en' ? 'Interchange' : 'इंटरचेंज'}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stations;