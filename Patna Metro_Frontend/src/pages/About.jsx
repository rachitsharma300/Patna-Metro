import React from "react";
import { Button } from "../components/ui/Button";

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">About Patna Metro</h1>

      <div className="prose prose-lg">
        <p>Patna Metro is a rapid transit system serving the city of Patna, Bihar.</p>
        <p>The network consists of two lines connecting major landmarks across the city.</p>
      </div>

      <div className="mt-8">
        <Button variant="primary" onClick={() => window.open("#", "_blank")}>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default About;
