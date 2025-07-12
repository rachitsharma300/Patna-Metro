// constants.js
export const PATNA_METRO = {
  API_BASE_URL: "https://api.patnametro.in/v1",
  MAX_STATIONS: 26, // Expected total stations in Phase 1
  DEFAULT_TIMEOUT: 10000, // 10 seconds
  LINES: {
    LINE_1: "East-West Corridor (Danapur to Patna Station)",
    LINE_2: "North-South Corridor (Patna Junction to New ISBT)"
  },
  COLORS: {
    LINE_1_COLOR: "#FF0000", // Red
    LINE_2_COLOR: "#0000FF", // Blue
  },
  OPERATING_HOURS: {
    FIRST_TRAIN: "06:00 AM",
    LAST_TRAIN: "10:00 PM",
  },
};