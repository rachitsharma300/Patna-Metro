// src/utils/metroData.js
export const metroData = {
  lines: [
    {
      name: "Blue Line",
      stations: 24,
      length: "16.5 km",
      color: "blue-600",
      interchangeStations: ["Patna Junction", "Khemni Chak"],
      allStations: [
        "Danapur", "Patliputra", "Rupaspur", "Patna Junction", 
        "Mithapur", "Khemni Chak", "Bhikhna Pahari", "Zero Mile"
      ]
    },
    {
      name: "Red Line",
      stations: 18,
      length: "14.5 km",
      color: "red-600",
      interchangeStations: ["Patna Junction"],
      allStations: [
        "Patna Junction", "PMCH", "Patna Zoo", "Rajendra Nagar", 
        "Gandhi Maidan", "Patna Sahib", "Malahi Pakri"
      ]
    },
  ],
  fareSlabs: [
    { range: "0-2 km", fare: 10 },
    { range: "2-5 km", fare: 20 },
    { range: "5-12 km", fare: 30 },
    { range: "12-21 km", fare: 40 },
    { range: "21-32 km", fare: 50 },
    { range: "32+ km", fare: 60 },
  ],
  timings: {
    firstTrain: "06:00",
    lastTrain: "22:00",
    frequency: "5-10 minutes",
  },
  // New additions to support the FareInfo component
  stations: [
    "Danapur", "Patliputra", "Rupaspur", "Patna Junction",
    "Mithapur", "Khemni Chak", "Bhikhna Pahari", "Zero Mile",
    "PMCH", "Patna Zoo", "Rajendra Nagar", "Gandhi Maidan",
    "Patna Sahib", "Malahi Pakri"
  ],
  ticketOptions: [
    {
      name: "Smart Card",
      discount: "10%",
      description: "Rechargeable card for all metro rides"
    },
    {
      name: "Daily Pass",
      price: "₹120",
      description: "Unlimited travel for one day"
    },
    {
      name: "Tourist Pass",
      price: "₹300",
      description: "3-day unlimited travel"
    },
    {
      name: "Student Pass",
      discount: "25%",
      description: "For students with valid ID"
    }
  ],
  notices: [
    "Children below 90 cm height travel free",
    "Senior citizens (60+ years) get 20% discount",
    "Smart cards can be recharged online or at any station",
    "First train at 6:00 AM, last train at 10:00 PM"
  ]
};