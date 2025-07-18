import React from "react";

export const LineBadge = ({ line }) => {
  const lineColors = {
    "Blue Line": "bg-blue-600 text-white",
    "Red Line": "bg-red-600 text-white",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${lineColors[line] || "bg-gray-600"}`}
    >
      {line}
    </span>
  );
};
