// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import FareInfo from "./pages/FareInfo";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import RouteFinder from "./components/RouteFinder";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routefinder" element={<RouteFinder />} />
            <Route path="/about" element={<About />} />
            <Route path="/fare-info" element={<FareInfo />} />
            <Route path="/metro-map" element={<MapPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
