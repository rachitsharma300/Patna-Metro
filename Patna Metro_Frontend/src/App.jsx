import React, { useState } from 'react';
import StationSelector from './components/StationSelector';
import api from './services/api';

function App() {
  const [selected, setSelected] = useState({ source: '', destination: '' });
  const [route, setRoute] = useState([]);

  const handleSelect = (field, value) => {
    setSelected(prev => ({ ...prev, [field]: value }));
  };

  const getRoute = () => {
    api.get(`/stations/route?source=${selected.source}&destination=${selected.destination}`)
      .then(res => setRoute(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patna Metro Route Finder</h1>
      <StationSelector onSelect={handleSelect} />
      <button onClick={getRoute} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Find Route</button>

      {route.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Route Stations:</h2>
          <ul className="list-disc ml-4">
            {route.map(st => (
              <li key={st.id}>{st.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
