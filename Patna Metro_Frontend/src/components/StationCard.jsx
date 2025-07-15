import React from 'react';

function StationCard({ station }) {
  const lineColor = station.line === 'Red Line' ? 'bg-red-600' : 'bg-blue-600';

  return (
    <div className="flex items-center space-x-4 p-2 border rounded">
      <div className={`w-4 h-4 ${lineColor} rounded-full`} title={station.line}></div>
      <div>{station.name}</div>
    </div>
  );
}

export default StationCard;
