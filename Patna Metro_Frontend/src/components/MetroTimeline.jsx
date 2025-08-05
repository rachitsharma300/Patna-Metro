import React from "react";

export const MetroTimeline = () => {
  const events = [
    {
      date: "2014",
      title: "Concept Proposed",
      description:
        "Initial proposal for Patna Metro submitted to central government",
    },
    {
      date: "2016",
      title: "Feasibility Study",
      description: "Detailed project report prepared by RITES",
    },
    {
      date: "Feb 2018",
      title: "Approval Granted",
      description: "Union Cabinet approves Patna Metro project",
    },
    {
      date: "Feb 2019",
      title: "Foundation Laid",
      description: "PM Modi lays foundation stone for the project",
    },
    {
      date: "2021",
      title: "Construction Begins",
      description: "Actual construction work starts on priority corridors",
    },
    {
      date: "2024 (Expected)",
      title: "First Trial Run",
      description: "Expected trial run on completed sections",
    },
    {
      date: "2026 (Expected)",
      title: "Full Operation",
      description: "Expected completion of Phase 1",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute left-1/2 w-1 h-full bg-blue-100 transform -translate-x-1/2"></div>
      {events.map((event, index) => (
        <div
          key={index}
          className={`relative mb-8 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
        >
          <div
            className={`absolute top-0 w-4 h-4 rounded-full bg-blue-600 ${index % 2 === 0 ? "-right-2" : "-left-2"}`}
          ></div>
          <div
            className={`inline-block p-4 rounded-lg shadow-sm border border-gray-200 ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
          >
            <div className="font-bold text-blue-600">{event.date}</div>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
