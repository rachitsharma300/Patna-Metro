import React from 'react';

export const InterchangeIcon = ({ size = 24 }) => {
  return (
    <div 
      className="flex items-center justify-center rounded-full bg-yellow-400 text-black font-bold"
      style={{ width: size, height: size }}
    >
      ⇄
    </div>
  );
};