import React, { useState } from "react";
import { FaLock, FaUserShield, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { loginAdmin } from "../../services/adminService";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await loginAdmin(email, password);
    
    setIsLoading(false);
    if (result.success) {
      onLogin(true);
    } else {
      setError("Invalid credentials or user not found.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="mx-auto w-20 h-20 bg-[#0B3D91] rounded-full flex items-center justify-center shadow-lg"
        >
          <FaUserShield className="text-white text-4xl" />
        </motion.div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure access required
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#0B3D91] focus:border-[#0B3D91] sm:text-sm transition-colors"
                  placeholder="patna@metro.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#0B3D91] focus:border-[#0B3D91] sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#0B3D91] hover:bg-[#082b6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3D91] transition-all"
              >
                <FaSignInAlt className="mr-2 mt-0.5" /> Sign In Securely
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
