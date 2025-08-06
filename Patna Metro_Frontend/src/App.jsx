import React, { useRef } from "react";
import "./i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components and Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import FareInfo from "./pages/FareInfo";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import RouteFinder from "./components/RouteFinder";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import Sitemap from "./pages/legal/Sitemap";
import DisclaimerPopup from "./components/DisclaimerPopup";
import Bot from "./components/bot/Bot";

function App() {
  //Ref for RouteFinder trigger
  const routeFinderRef = useRef();

  // Function passed to Bot to call triggerSearch in RouteFinder
  const handleTriggerSearch = () => {
    if (routeFinderRef.current) {
      routeFinderRef.current(); // Calls triggerSearch() from RouteFinder
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* Popup for Disclaimer */}
        <DisclaimerPopup />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/routefinder"
              element={
                // RouteFinder receives the ref so it can expose triggerSearch
                <RouteFinder triggerSearchRef={routeFinderRef} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/fare-info" element={<FareInfo />} />
            <Route path="/metro-map" element={<MapPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/*Bot is always visible and can now trigger RouteFinder */}
        <Bot triggerSearch={handleTriggerSearch} />

        {/* Bottom Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
