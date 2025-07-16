// Enhanced RouteFinder.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import StationCard from './StationCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExchangeAlt, FaSearch, FaTrain } from 'react-icons/fa';

function RouteFinder() {
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState({ source: '', destination: '' });
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/stations')
      .then(res => {
        setStations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (field, value) => {
    setSelected(prev => ({ ...prev, [field]: value }));
  };

  const getRoute = () => {
    if (!selected.source || !selected.destination) {
      alert('Please select both source and destination stations');
      return;
    }

    setLoading(true);
    api.get(`/stations/route?source=${selected.source}&destination=${selected.destination}`)
      .then(res => {
        setRoute(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Route not found or an error occurred.');
        setLoading(false);
      });
  };

  const reverseRoute = () => {
    setSelected(prev => ({
      source: prev.destination,
      destination: prev.source
    }));
    setRoute([]);
  };

  return (
    <motion.div 
      id="route-finder"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-2xl p-6 my-10 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-center mb-6">
        <FaTrain className="text-3xl text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          Route Finder
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Station</label>
            <select 
              onChange={(e) => handleSelect('source', e.target.value)} 
              value={selected.source}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select Source</option>
              {stations.map(st => (
                <option key={st.id} value={st.name}>{st.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Station</label>
            <select 
              onChange={(e) => handleSelect('destination', e.target.value)} 
              value={selected.destination}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select Destination</option>
              {stations.map(st => (
                <option key={st.id} value={st.name}>{st.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <motion.button 
            onClick={getRoute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`flex items-center px-6 py-3 rounded-lg shadow-md text-white font-medium ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} transition-all`}
          >
            {loading ? (
              'Finding...'
            ) : (
              <>
                <FaSearch className="mr-2" /> Find Route
              </>
            )}
          </motion.button>
          
          <motion.button 
            onClick={reverseRoute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-6 py-3 rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-all"
          >
            <FaExchangeAlt className="mr-2" /> Reverse
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {route.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Your Journey</h3>
            <div className="space-y-4">
              {route.map((st, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <StationCard station={st} />
                  {idx < route.length - 1 && (
                    <div className="h-6 w-0.5 bg-gray-300 my-1"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RouteFinder;