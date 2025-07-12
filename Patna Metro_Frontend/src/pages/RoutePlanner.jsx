import { useState } from 'react';
import { FaExchangeAlt, FaTrain, FaLanguage } from 'react-icons/fa';
import { metroLines, allStations } from '../utils/metroData';
import StationSelector from '../components/route-planner/StationSelector';
import RouteResults from '../components/route-planner/RouteResults';
import JourneySummary from '../components/route-planner/JourneySummary';
import MetroMap from '../components/route-planner/MetroMap';
import Button from '../components/common/Button';

const RoutePlanner = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [language, setLanguage] = useState('en');

  const calculateRoute = () => {
    if (!source || !destination) return;
    
    // Mock route calculation - replace with actual algorithm
    const mockRoute = [
      allStations.find(s => s.id === source),
      allStations.find(s => s.id === 'interchange-1'),
      allStations.find(s => s.id === destination)
    ].filter(Boolean);

    setRoute(mockRoute);
  };

  const swapStations = () => {
    setSource(destination);
    setDestination(source);
    setRoute([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {language === 'en' ? 'Route Planner' : 'मार्ग योजनाकार'}
          </h1>
          <Button
            variant="outline"
            size="small"
            onClick={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
            icon={<FaLanguage />}
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </Button>
        </div>

        <StationSelector
          stations={allStations}
          source={source}
          destination={destination}
          onSourceChange={setSource}
          onDestinationChange={setDestination}
          onSwap={swapStations}
          language={language}
          className="mb-6"
        />

        <Button
          onClick={calculateRoute}
          disabled={!source || !destination}
          className="w-full mb-6"
          icon={<FaTrain />}
        >
          {language === 'en' ? 'Find Route' : 'मार्ग खोजें'}
        </Button>

        {route.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">
                {language === 'en' ? 'Your Journey' : 'आपकी यात्रा'}
              </h2>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap 
                  ? (language === 'en' ? 'Show List' : 'सूची दिखाएं')
                  : (language === 'en' ? 'Show Map' : 'मानचित्र दिखाएं')}
              </Button>
            </div>

            <div className="p-6">
              <JourneySummary
                stationsCount={route.length - 1}
                fare={10 + (route.length - 1) * 5}
                time={(route.length - 1) * 2}
                language={language}
                className="mb-6"
              />

              {showMap ? (
                <MetroMap
                  stations={allStations}
                  lines={Object.values(metroLines)}
                  selectedRoute={route.map(s => s.id)}
                  language={language}
                  className="h-96"
                />
              ) : (
                <RouteResults 
                  route={route} 
                  language={language}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePlanner;