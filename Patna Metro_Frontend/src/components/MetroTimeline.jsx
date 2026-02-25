import React from "react";
import { useTranslation } from "react-i18next";

export const MetroTimeline = () => {
  const { t } = useTranslation();
  const events = t("aboutPage.timeline.events", { returnObjects: true }) || [];

  // Modern color cycle for dots
  const colors = [
    "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]",
    "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]",
    "bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)]",
    "bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]",
    "bg-fuchsia-600 shadow-[0_0_10px_rgba(192,38,211,0.5)]",
    "bg-pink-600 shadow-[0_0_10px_rgba(219,39,119,0.5)]",
    "bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.5)]",
  ];

  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4 sm:px-0">
      {/* Central Line */}
      <div className="absolute left-4 sm:left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-100 via-violet-200 to-pink-100 transform sm:-translate-x-1/2 opacity-70"></div>

      <div className="space-y-12">
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row items-start sm:items-center w-full ${index % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
          >
            {/* Content Card */}
            <div className="w-full sm:w-[45%] pl-10 sm:pl-0">
              <div className={`p-6 rounded-2xl border border-gray-100 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-white ${index % 2 === 0 ? "sm:text-right" : "sm:text-left"
                }`}>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                  {event.date}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Central Dot */}
            <div className="absolute left-2 sm:static sm:w-[10%] flex justify-center z-10 py-4 sm:py-0">
              <div className={`w-4 h-4 rounded-full border-2 border-white ring-4 ring-white/50 animate-pulse ${colors[index % colors.length]}`}></div>
            </div>

            {/* Empty space for alternating layout */}
            <div className="hidden sm:block w-[45%]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
