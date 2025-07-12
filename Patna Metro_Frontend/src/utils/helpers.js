// helpers.js
export const formatTime = (timeStr) => {
  if (!timeStr) return "--";
  return timeStr.replace("AM", " am").replace("PM", " pm");
};

export const getLineColor = (lineName) => {
  const { COLORS } = PATNA_METRO;
  switch (lineName) {
    case "LINE_1":
      return COLORS.LINE_1_COLOR;
    case "LINE_2":
      return COLORS.LINE_2_COLOR;
    default:
      return "#CCCCCC"; // Default gray
  }
};

export const isPeakHour = (time) => {
  const hours = new Date().getHours();
  return (hours >= 8 && hours <= 11) || (hours >= 17 && hours <= 20);
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));