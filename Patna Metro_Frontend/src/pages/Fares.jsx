import { useState } from 'react';
import { FaRupeeSign, FaSearch } from 'react-icons/fa';
import { metroLines } from '../utils/metroData';
import JourneySummary from '../components/route-planner/JourneySummary';
import Button from '../components/common/Button';
import Select from '../components/common/Select';

const Fares = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [fare, setFare] = useState(null);
  const [language, setLanguage] = useState('en');

  const calculateFare = () => {
    // Simple fare calculation - replace with actual algorithm
    const baseFare = 10;
    const perStation = 5;
    const stationsCount = 5; // Replace with actual calculation
    setFare(baseFare + stationsCount * perStation);
  };

  const allStations = Object.values(metroLines).flatMap(line => line.stations);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          {language === 'en' ? 'Fare Calculator' : 'किराया कैलकुलेटर'}
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Select
              label={language === 'en' ? 'From Station' : 'प्रस्थान स्टेशन'}
              options={allStations.map(s => ({
                value: s.id,
                label: s[language]
              }))}
              value={fromStation}
              onChange={setFromStation}
            />

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="small"
                onClick={() => {
                  const temp = fromStation;
                  setFromStation(toStation);
                  setToStation(temp);
                }}
              >
                <FaExchangeAlt />
              </Button>
            </div>

            <Select
              label={language === 'en' ? 'To Station' : 'गंतव्य स्टेशन'}
              options={allStations.map(s => ({
                value: s.id,
                label: s[language]
              }))}
              value={toStation}
              onChange={setToStation}
            />
          </div>

          <Button
            onClick={calculateFare}
            disabled={!fromStation || !toStation}
            className="mt-6 w-full"
            icon={<FaSearch />}
          >
            {language === 'en' ? 'Calculate Fare' : 'किराया गणना करें'}
          </Button>
        </div>

        {fare && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {language === 'en' ? 'Fare Information' : 'किराया जानकारी'}
            </h2>
            <JourneySummary
              stationsCount={5}
              fare={fare}
              time={15}
              language={language}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Fares;