"use client";
import { carFleets } from "@/app/square/fleets/page";
import React, { useState } from "react";

const CarSelectionForm = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarSelection = (car) => {
    setSelectedCar(car);
  };

  return (
    <>
      {carFleets.map((car, index) => (
        <div key={index} class="snap-start shrink-0">
          <div className="h-55 w-72 sm:w-80 rounded-lg border bg-gradient-to-br from-gray-50 to-white p-2 relative">
            <label className="flex flex-col cursor-pointer">
              <input
                type="radio"
                name="selectedCar"
                value={car.carName}
                checked={selectedCar === car}
                onChange={() => handleCarSelection(car)}
                className="absolute top-2 left-2 opacity-0 w-4 h-4"
              />
              <img
                className="h-44 w-full ml-2 object-cover"
                src={car.imageUrl}
                alt={car.carName}
              />
              <div
                className={`absolute top-2 left-2 w-4 h-4 border-2 rounded-full ${
                  selectedCar === car
                    ? "bg-yellow-500 border-yellow-500"
                    : "border-gray-400"
                }`}
              ></div>
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default CarSelectionForm;
