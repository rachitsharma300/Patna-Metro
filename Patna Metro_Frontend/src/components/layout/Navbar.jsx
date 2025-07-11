import { useState, useEffect } from "react";
import { 
  FaSubway, 
  FaUserCircle, 
  FaTimes, 
  FaBars, 
  FaSun, 
  FaMoon 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    return localStorage.getItem('darkMode') === 'true' || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navItems = [
    { name: "Routes", href: "#routes" },
    { name: "Fares", href: "#fares" },
    { name: "Timings", href: "#timings" },
  ];

  return (
    <nav className={`
      fixed w-full z-50 transition-all duration-300
      ${scrolled ? "bg-blue-800 shadow-lg" : "bg-blue-700"}
      dark:bg-gray-900 dark:shadow-gray-800
    `}>
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaSubway className="text-2xl text-white dark:text-blue-400" />
            <span className="text-xl font-bold text-white dark:text-blue-300">
              Patna Metro
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-blue-200 transition-colors font-medium dark:text-blue-300 dark:hover:text-blue-100"
              >
                {item.name}
              </a>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-blue-600 dark:hover:bg-gray-700 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-300 text-xl" />
              ) : (
                <FaMoon className="text-gray-200 text-xl" />
              )}
            </button>
            
            <FaUserCircle className="text-2xl text-white dark:text-blue-300 cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-1 text-white"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-300" />
              ) : (
                <FaMoon className="text-gray-200" />
              )}
            </button>
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-blue-800 dark:bg-gray-800"
            >
              <div className="px-2 pt-2 pb-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-2 border-t border-blue-700 dark:border-gray-700">
                  <button className="flex items-center space-x-2 px-3 py-2 text-white">
                    <FaUserCircle />
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}