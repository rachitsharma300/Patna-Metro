import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaExclamationTriangle, FaSave, FaSignOutAlt, FaRocket } from "react-icons/fa";
import { updateTicker, updateAlertBanner, subscribeToSiteData } from "../../services/adminService";

const AdminDashboard = ({ onLogout }) => {
  const [tickerText, setTickerText] = useState("• PATNA METRO UPDATE: Operations on the priority corridor are scheduled to begin by August 15, 2025. •");
  
  const [alertActive, setAlertActive] = useState(false);
  const [alertType, setAlertType] = useState("info"); // info, warning, danger
  const [alertMessage, setAlertMessage] = useState("");

  const [savingTicker, setSavingTicker] = useState(false);
  const [savingAlert, setSavingAlert] = useState(false);

  // Load existing data on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = subscribeToSiteData((data) => {
      if (data) {
        if (data.tickerText !== undefined) setTickerText(data.tickerText);
        if (data.alertActive !== undefined) setAlertActive(data.alertActive);
        if (data.alertType) setAlertType(data.alertType);
        if (data.alertMessage !== undefined) setAlertMessage(data.alertMessage);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleSaveTicker = async (e) => {
    e.preventDefault();
    setSavingTicker(true);
    const success = await updateTicker(tickerText);
    setSavingTicker(false);
    if (!success) alert("Failed to update ticker. Check console.");
  };

  const handleSaveAlert = async (e) => {
    e.preventDefault();
    setSavingAlert(true);
    const success = await updateAlertBanner(alertActive, alertType, alertMessage);
    setSavingAlert(false);
    if (!success) alert("Failed to update alert banner. Check console.");
  };


  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      
      {/* Top Navigation / Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0B3D91]">Command Center</h1>
            <p className="text-gray-500 mt-1">Manage Patna Metro live data</p>
          </div>
          <button 
            onClick={() => onLogout(false)}
            className="flex items-center text-red-500 hover:text-red-700 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module 1: Live Ticker */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="bg-blue-50 border-b border-blue-100 p-6 flex items-center">
            <FaNewspaper className="text-blue-600 text-2xl mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Live Homepage Ticker</h2>
          </div>
          
          <form className="p-6" onSubmit={handleSaveTicker}>
            <p className="text-sm text-gray-500 mb-4">
              This text scrolls continuously across the bottom of the main hero section. Use it for general news, timelines, and status updates.
            </p>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticker Announcement
            </label>
            <textarea
              rows={4}
              value={tickerText}
              onChange={(e) => setTickerText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-colors resize-none mb-6 text-gray-700"
              placeholder="Enter announcement here..."
            />

            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Live Preview</span>
              <div className="overflow-hidden whitespace-nowrap bg-[#0B3D91] text-white py-2 px-4 rounded-md text-sm">
                <span className="inline-block animate-pulse">{tickerText || "No text entered..."}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingTicker}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#0B3D91] hover:bg-[#082b6b] transition-all ${savingTicker ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {savingTicker ? <FaSave className="animate-spin mr-2" /> : <FaRocket className="mr-2" />} 
              {savingTicker ? "Publishing..." : "Publish to Website"}
            </button>
          </form>
        </motion.div>

        {/* Module 2: Global Alert Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
        >
          <div className="bg-red-50 border-b border-red-100 p-6 flex items-center">
            <FaExclamationTriangle className="text-red-500 text-2xl mr-3" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">Global Alert Banner</h2>
            </div>
            {/* Toggle Switch */}
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={alertActive}
                  onChange={() => setAlertActive(!alertActive)}
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${alertActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${alertActive ? 'transform translate-x-6' : ''}`}></div>
              </div>
            </label>
          </div>
          
          <form className="p-6 flex-1 flex flex-col" onSubmit={handleSaveAlert}>
            <p className="text-sm text-gray-500 mb-6">
              Activate this to override the top of the website with a massive alert. Useful for severe delays, station closures, or extreme weather warnings.
            </p>

            <div className={`transition-opacity ${!alertActive ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alert Severity</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" value="info" checked={alertType === "info"} onChange={(e) => setAlertType(e.target.value)} className="text-blue-600 focus:ring-blue-500 h-4 w-4" />
                    <span className="ml-2 text-sm text-gray-700">Info (Blue)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" value="warning" checked={alertType === "warning"} onChange={(e) => setAlertType(e.target.value)} className="text-yellow-600 focus:ring-yellow-500 h-4 w-4" />
                    <span className="ml-2 text-sm text-gray-700">Warning (Yellow)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" value="danger" checked={alertType === "danger"} onChange={(e) => setAlertType(e.target.value)} className="text-red-600 focus:ring-red-500 h-4 w-4" />
                    <span className="ml-2 text-sm text-gray-700">Severe (Red)</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alert Message</label>
                <input
                  type="text"
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="e.g., Services suspended on Blue Line due to technical fault."
                />
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="submit"
                disabled={savingAlert}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${alertActive ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400'} transition-all ${savingAlert ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {savingAlert ? <FaSave className="animate-spin mr-2" /> : <FaRocket className="mr-2" />} 
                {alertActive ? "Deploy Alert to Website" : "Save & Remove Alert"}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;
