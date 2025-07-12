export const metroLines = {
  red: {
    id: 'red',
    name: { en: "Red Line", hi: "रेड लाइन" },
    color: '#E53E3E',
    stations: [
      { id: 'RD01', en: "Danapur Cantonment", hi: "दानापुर छावनी", lat: 25.6358, lng: 85.0465 },
      { id: 'RD02', en: "Saguna Mor", hi: "सगुना मोड़", lat: 25.6289, lng: 85.0521 },
      // Add all stations with coordinates
    ]
  },
  blue: {
    id: 'blue',
    name: { en: "Blue Line", hi: "ब्लू लाइन" },
    color: '#3182CE',
    stations: [
      { id: 'BL01', en: "Akashvani", hi: "आकाशवाणी", lat: 25.6154, lng: 85.1352 },
      // Add all stations with coordinates
    ]
  }
};

export const allStations = Object.values(metroLines).flatMap(line => line.stations);
export const interchangeStations = ['Patna Junction']; // IDs of interchange stations

// Helper to find line by station ID
export const getLineByStationId = (stationId) => {
  return Object.values(metroLines).find(line => 
    line.stations.some(station => station.id === stationId)
  );
};