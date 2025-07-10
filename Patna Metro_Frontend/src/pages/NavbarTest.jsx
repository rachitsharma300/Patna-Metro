import { useState, useEffect } from "react";
import { FaSubway, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Custom Dark/Light Switch Component
const ThemeSwitch = ({ darkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    aria-label="Toggle theme"
    className={`relative w-14 h-8 rounded-full p-1 transition-all duration-500 ${darkMode ? 'bg-patna-dark' : 'bg-patna-primary-light'}`}
  >
    <motion.div
      className={`w-6 h-6 rounded-full shadow-lg ${darkMode ? 'bg-patna-accent-dark' : 'bg-yellow-300'}`}
      initial={{ x: darkMode ? 26 : 0 }}
      animate={{ x: darkMode ? 26 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {darkMode ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-patna-dark shadow-[inset_3px_3px_0px_rgba(0,0,0,0.2)]" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[inset_-2px_-2px_0px_rgb(253,186,116)]" />
        </motion.div>
      )}
    </motion.div>
  </button>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Routes", href: "#routes" },
    { name: "Fares", href: "#fares" },
    { name: "Timings", href: "#timings" },
  ];

  return (
    <nav className={`
      fixed w-full z-50 transition-all duration-500
      ${scrolled ? 'shadow-lg' : ''}
      ${darkMode 
        ? 'bg-patna-dark shadow-gray-900/50' 
        : 'bg-gradient-to-r from-patna-primary-light to-patna-accent-light shadow-blue-400/20'
      }
    `}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <FaSubway className={`text-3xl ${darkMode ? 'text-patna-accent-dark' : 'text-white'}`} />
            <span className={`text-2xl font-bold ${darkMode ? 'text-patna-light' : 'text-white'}`}>
              Patna Metro
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  relative px-1 py-2 font-medium transition-all
                  ${darkMode 
                    ? 'text-patna-light hover:text-patna-accent-dark' 
                    : 'text-white hover:text-blue-100'
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:h-0.5 after:bg-patna-accent-dark after:transition-all 
                  after:duration-300 after:w-0 hover:after:w-full
                `}
              >
                {item.name}
              </a>
            ))}
            
            <ThemeSwitch darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
            
            <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-600'} transition`}>
              <FaUserCircle className={`text-2xl ${darkMode ? 'text-patna-accent-dark' : 'text-white'}`} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeSwitch darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
            <button
              className={`p-2 ${darkMode ? 'text-patna-light' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
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
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden ${darkMode ? 'bg-patna-dark' : 'bg-blue-600'}`}
            >
              <div className="px-4 py-3 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg font-medium transition ${darkMode ? 'text-patna-light hover:bg-gray-800' : 'text-white hover:bg-blue-500'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-3 border-t border-opacity-20 border-white">
                  <button className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-500'} transition`}>
                    <FaUserCircle className="text-xl" />
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