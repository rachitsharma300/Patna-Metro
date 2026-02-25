import React from "react";
import Hero from "../components/Hero";
import RouteFinder from "../components/RouteFinder";

function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <RouteFinder />
      </div>
    </>
  );
}

export default Home;
