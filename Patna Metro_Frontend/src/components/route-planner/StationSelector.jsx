import PropTypes from 'prop-types';
import { FaExchangeAlt } from 'react-icons/fa';
import Select from '../common/Select';
import Button from '../common/Button';

const StationSelector = ({ 
  stations, 
  source, 
  destination, 
  onSourceChange, 
  onDestinationChange, 
  onSwap,
  language = 'en',
  className = '' 
}) => {
  const translations = {
    en: {
      from: 'From',
      to: 'To',
      swap: 'Swap stations'
    },
    hi: {
      from: 'से',
      to: 'तक',
      swap: 'स्टेशन बदलें'
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Select
        label={translations[language].from}
        options={stations.map(station => ({
          value: station.id,
          label: station[language]
        }))}
        value={source}
        onChange={onSourceChange}
      />

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="small"
          onClick={onSwap}
          aria-label={translations[language].swap}
        >
          <FaExchangeAlt />
        </Button>
      </div>

      <Select
        label={translations[language].to}
        options={stations.map(station => ({
          value: station.id,
          label: station[language]
        }))}
        value={destination}
        onChange={onDestinationChange}
      />
    </div>
  );
};

StationSelector.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
      hi: PropTypes.string.isRequired
    })
  ).isRequired,
  source: PropTypes.string,
  destination: PropTypes.string,
  onSourceChange: PropTypes.func.isRequired,
  onDestinationChange: PropTypes.func.isRequired,
  onSwap: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['en', 'hi']),
  className: PropTypes.string
};

export default StationSelector;