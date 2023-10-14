"use client";

import React from "react";
import NairaIcon from "../NairaIcon";

const Charges = ({ charge, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col  cursor-pointer bg-white p-2 md:p-4 overflow-y-auto"
    >
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">{charge.name}</h3>
        <p className="text-gray-500 mb-1">
          {charge.type === "percentage" ? "Percentage" : "Flat"}
        </p>
        {charge.type === "percentage" ? (
          <p className="text-gray-500">{charge.value + "%"}</p>
        ) : (
          <p className="text-gray-500 flex items-center">
            <NairaIcon /> {charge.value}
          </p>
        )}
      </div>
    </div>
  );
};

export default Charges;
