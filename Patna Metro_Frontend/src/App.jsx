import React from "react";
import "./i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* DisclaimerPopup */}
        <DisclaimerPopup />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routefinder" element={<RouteFinder />} />
            <Route path="/about" element={<About />} />
            <Route path="/fare-info" element={<FareInfo />} />
            <Route path="/metro-map" element={<MapPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </main>

        {/* Place Bot here, outside Routes */}
        <Bot />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
