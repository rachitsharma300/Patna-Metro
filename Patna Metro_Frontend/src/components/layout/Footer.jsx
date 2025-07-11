import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegClock } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Patna Metro</h3>
            <p className="text-gray-300">
              Transforming urban mobility in Bihar with efficient, sustainable metro services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Routes & Maps</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Fare Calculator</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Service Updates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-blue-400 mt-1" />
                <span className="text-gray-300">Buddha Colony, Patna, Bihar 800001</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-blue-400" />
                <span className="text-gray-300">+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <span className="text-gray-300">contact@patnametro.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaRegClock className="text-blue-400" />
                <span className="text-gray-300">Mon-Sun: 6:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe for service updates and offers
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l focus:outline-none text-gray-800"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Patna Metro. All rights reserved.
          </div>
          <div className="text-gray-400">
            Developed with ❤️ by <span className="text-blue-400">Rachit Sharma</span>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;