import React, { useEffect, useState } from 'react';
import api from '../services/api';

function StationSelector({ onSelect }) {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    api.get('/stations')
      .then(res => setStations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      <select onChange={(e) => onSelect('source', e.target.value)} className="border p-2 rounded w-full">
        <option>Select Source</option>
        {stations.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
      </select>
      <select onChange={(e) => onSelect('destination', e.target.value)} className="border p-2 rounded w-full">
        <option>Select Destination</option>
        {stations.map(st => <option key={st.id} value={st.name}>{st.name}</option>)}
      </select>
    </div>
  );
}

export default StationSelector;
