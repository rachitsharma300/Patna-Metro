import React, { useRef, useState, useEffect } from "react";
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
import { recordVisit } from "./services/api";

function App() {
  //  Create a ref to access triggerSearch method from RouteFinder
  const routeFinderRef = useRef();

  //  States to hold source and destination selected by Bot
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

    useEffect(() => {
    recordVisit();
  }, []);

  //  Function that Bot will call to trigger the RouteFinder search
  const handleTriggerSearch = () => {
    //   if (routeFinderRef.current && typeof routeFinderRef.current.triggerSearch === "function") {
    //     console.log("Triggering search from Bot via ref...");
    //     routeFinderRef.current.triggerSearch(); // calling exposed method
    //   } else {
    //     console.warn("routeFinderRef is not ready or triggerSearch is undefined.");
    //   }
    // };
    if (routeFinderRef.current) {
      // console.log(" Triggering search from Bot via ref...");   // Debugging log
      routeFinderRef.current.triggerSearch();
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
        {/*   className="flex-grow overflow-y-auto bg-gray-100 px-0 py-16">  Fix Screen  */}
        <main
          className="flex-grow overflow-y-auto bg-gray-100 px-0 py-16"
        >
          <Routes>
            <Route path="/" element={<Home />} />

            {/* RouteFinder receives source, destination, and ref */}
            <Route
              path="/routefinder"
              element={
                <RouteFinder
                  ref={routeFinderRef}
                  source={source}
                  destination={destination}
                />
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

        {/* Bot always visible. We pass trigger + setSource + setDestination to it. */}
        <Bot
          triggerSearch={handleTriggerSearch}
          setSource={setSource}
          setDestination={setDestination}
        />
                {/* Feedback Sidebar - Fixed Left Button */}
<a
  href="https://forms.gle/kVNBywtBtG131zmcA"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed right-0 top-1/2 -translate-y-1/2
             bg-black/50 backdrop-blur-md 
             text-white font-semibold tracking-wider
             px-2 py-1 rounded-l-xl shadow-lg
             hover:scale-110 hover:bg-yellow-400 hover:text-black
             transition-all duration-500 ease-in-out 
             animate-pulse rotate-180 [writing-mode:vertical-rl]"
>
  ✨ Feedback
</a>





        {/* Bottom Footer */}

        {/* Bottom Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
