export const metroData = {
  lines: [
    {
      name: "Blue Line",
      stations: 24,
      length: "16.5 km",
      color: "blue-600",
      interchangeStations: ["Patna Junction", "Khemni Chak"]
    },
    {
      name: "Red Line",
      stations: 18,
      length: "14.5 km",
      color: "red-600",
      interchangeStations: ["Patna Junction"]
    }
  ],
  fareSlabs: [
    { range: "0-2 km", fare: 10 },
    { range: "2-5 km", fare: 20 },
    { range: "5-12 km", fare: 30 },
    { range: "12-21 km", fare: 40 },
    { range: "21-32 km", fare: 50 },
    { range: "32+ km", fare: 60 }
  ],
  timings: {
    firstTrain: "06:00",
    lastTrain: "22:00",
    frequency: "5-10 minutes"
  }
};