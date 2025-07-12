import PropTypes from 'prop-types';
import { FaExchangeAlt, FaMapMarkerAlt } from 'react-icons/fa';

const RouteResults = ({ 
  route, 
  language = 'en',
  className = '' 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {route.map((station, index) => (
        <div key={`${station.id}-${index}`} className="flex items-start">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 ${
              station.isInterchange ? 'bg-purple-600' : 'bg-blue-600'
            }`}
          >
            {station.isInterchange ? (
              <FaExchangeAlt className="text-white text-sm" />
            ) : (
              <FaMapMarkerAlt className="text-white text-sm" />
            )}
          </div>
          
          <div className="flex-1">
            <div className={`font-medium ${
              station.isInterchange ? 'text-purple-700' : 'text-gray-800'
            }`}>
              {station[language]}
              {station.isInterchange && (
                <span className="ml-2 text-xs text-gray-500">
                  ({language === 'en' ? 'Interchange' : 'इंटरचेंज'})
                </span>
              )}
            </div>
            
            {index < route.length - 1 && (
              <div className={`h-6 w-0.5 ml-3.5 my-1 ${
                route[index+1].isInterchange || station.isInterchange
                  ? 'bg-purple-300'
                  : 'bg-blue-300'
              }`}></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

RouteResults.propTypes = {
  route: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
      hi: PropTypes.string.isRequired,
      isInterchange: PropTypes.bool
    })
  ).isRequired,
  language: PropTypes.oneOf(['en', 'hi']),
  className: PropTypes.string
};

export default RouteResults;