"use client";

import React from "react";

const Badges = ({ badge, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col  cursor-pointer bg-white p-4 overflow-y-auto"
    >
      <div className="flex flex-col ">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-3">
            <div className={`w-6 h-6 ${badge.color} rounded-full`}></div>
            <p className="font-light px-3 text-md">{badge.text}</p>
          </div>
          <p className="text-green-500">{badge.status}</p>
        </div>
      </div>
    </div>
  );
};
export default Badges;
