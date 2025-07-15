import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StationCard from './StationCard';

function RouteFinder() {
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState({ source: '', destination: '' });
  const [route, setRoute] = useState([]);

  useEffect(() => {
    api.get('/stations')
      .then(res => setStations(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (field, value) => {
    setSelected(prev => ({ ...prev, [field]: value }));
  };

  const getRoute = () => {
    if (!selected.source || !selected.destination) return;

    api.get(`/stations/route?source=${selected.source}&destination=${selected.destination}`)
      .then(res => setRoute(res.data))
      .catch(() => alert('Route not found or an error occurred.'));
  };

  const reverseRoute = () => {
    setSelected(prev => ({
      source: prev.destination,
      destination: prev.source
    }));
    setRoute([]);
  };

  return (
    <div className="bg-white shadow rounded p-6 mt-6">
      <div className="space-y-4">
        <select onChange={(e) => handleSelect('source', e.target.value)} value={selected.source} className="border p-2 rounded w-full">
          <option>Select Source</option>
          {stations.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
        </select>

        <select onChange={(e) => handleSelect('destination', e.target.value)} value={selected.destination} className="border p-2 rounded w-full">
          <option>Select Destination</option>
          {stations.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
        </select>

        <div className="flex space-x-4">
          <button onClick={getRoute} className="bg-green-600 text-white px-4 py-2 rounded">Find Route</button>
          <button onClick={reverseRoute} className="bg-yellow-500 text-white px-4 py-2 rounded">Reverse</button>
        </div>
      </div>

      {route.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Route Stations:</h2>
          <div className="space-y-2">
            {route.map((st, idx) => (
              <div key={st.id}>
                <StationCard station={st} />
                {idx < route.length - 1 && (
                  <div className="text-center text-gray-400">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RouteFinder;
