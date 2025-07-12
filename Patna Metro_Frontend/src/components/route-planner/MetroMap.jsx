import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import StationMarker from '../common/StationMarker';

const MetroMap = ({ 
  stations, 
  lines, 
  selectedRoute = [], 
  language = 'en',
  className = '' 
}) => {
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Simple pan and zoom handlers
  const handleZoom = (factor) => {
    setZoom(prev => Math.min(2, Math.max(0.5, prev * factor));
  };

  const handlePan = (dx, dy) => {
    setPan(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  return (
    <div className={`relative border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <button 
          onClick={() => handleZoom(1.1)}
          className="bg-white p-2 rounded shadow"
        >
          +
        </button>
        <button 
          onClick={() => handleZoom(0.9)}
          className="bg-white p-2 rounded shadow"
        >
          -
        </button>
      </div>

      {/* Map Canvas */}
      <div 
        ref={mapRef}
        className="relative h-full w-full bg-gray-50"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`
        }}
      >
        {/* Render metro lines */}
        {lines.map(line => (
          <svg key={line.id} className="absolute inset-0">
            <path
              d={line.path}
              stroke={line.color}
              strokeWidth="8"
              fill="none"
            />
          </svg>
        ))}

        {/* Render stations */}
        {stations.map(station => (
          <div 
            key={station.id}
            className="absolute"
            style={{
              left: `${station.x}%`,
              top: `${station.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <StationMarker
              stationName={station[language]}
              lineColor={station.lineColor}
              isInterchange={station.isInterchange}
              size={selectedRoute.includes(station.id) ? 'large' : 'medium'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

MetroMap.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
      hi: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      lineColor: PropTypes.string.isRequired,
      isInterchange: PropTypes.bool
    })
  ).isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedRoute: PropTypes.arrayOf(PropTypes.string),
  language: PropTypes.oneOf(['en', 'hi']),
  className: PropTypes.string
};

export default MetroMap;