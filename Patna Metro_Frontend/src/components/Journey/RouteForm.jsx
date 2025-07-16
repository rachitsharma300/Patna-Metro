import React from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaSearch } from 'react-icons/fa';

const RouteForm = ({
  stations,
  selected,
  loading,
  onSelectChange,
  onFindRoute,
  onReverseRoute
}) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Source Station</label>
          <select 
            onChange={(e) => onSelectChange('source', e.target.value)} 
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
            onChange={(e) => onSelectChange('destination', e.target.value)} 
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
          onClick={onFindRoute}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`flex items-center px-6 py-3 rounded-lg shadow-md text-white font-medium ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} transition-all`}
        >
          {loading ? 'Finding...' : (
            <>
              <FaSearch className="mr-2" /> Find Route
            </>
          )}
        </motion.button>
        
        <motion.button 
          onClick={onReverseRoute}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-6 py-3 rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-all"
        >
          <FaExchangeAlt className="mr-2" /> Reverse
        </motion.button>
      </div>
    </div>
  );
};

export default RouteForm;