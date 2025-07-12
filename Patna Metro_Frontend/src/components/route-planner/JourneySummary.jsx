import PropTypes from 'prop-types';
import { FaTrain, FaRupeeSign, FaClock } from 'react-icons/fa';

const JourneySummary = ({ 
  stationsCount, 
  fare, 
  time, 
  language = 'en',
  className = '' 
}) => {
  const translations = {
    en: {
      stations: 'Stations',
      fare: 'Fare',
      time: 'Time'
    },
    hi: {
      stations: 'स्टेशन',
      fare: 'किराया',
      time: 'समय'
    }
  };

  return (
    <div className={`grid grid-cols-3 gap-4 text-center ${className}`}>
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
          <FaTrain />
          <span className="text-sm">{translations[language].stations}</span>
        </div>
        <div className="font-bold text-blue-800">{stationsCount}</div>
      </div>
      
      <div className="bg-green-50 p-3 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
          <FaRupeeSign />
          <span className="text-sm">{translations[language].fare}</span>
        </div>
        <div className="font-bold text-green-800">₹{fare}</div>
      </div>
      
      <div className="bg-orange-50 p-3 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-orange-600 mb-1">
          <FaClock />
          <span className="text-sm">{translations[language].time}</span>
        </div>
        <div className="font-bold text-orange-800">{time} min</div>
      </div>
    </div>
  );
};

JourneySummary.propTypes = {
  stationsCount: PropTypes.number.isRequired,
  fare: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  language: PropTypes.oneOf(['en', 'hi']),
  className: PropTypes.string
};

export default JourneySummary;