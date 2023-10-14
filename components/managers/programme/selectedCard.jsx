"use client";
import React, { useState } from "react";
import useSWR from "swr";

const accessToken = globalThis.window?.localStorage.getItem("accessToken");
const getCarownerId =
  globalThis.window?.localStorage.getItem("car_owner_user") || null;

const CarSelectionForm = ({ handleCarSelection, selectedCar, checks }) => {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}fleets/user/${getCarownerId}`,
    fetcher
  );
  console.log({ checks, selectedCar });
  return (
    <>
      {!isLoading &&
        data?.length > 0 &&
        data?.map((car, index) => (
          <div key={index} class="snap-start shrink-0">
            <div className="h-55 w-72 sm:w-80 rounded-lg border bg-gradient-to-br from-gray-50 to-white p-2 relative">
              <label className="flex flex-col cursor-pointer">
                <input
                  type="radio"
                  name="fleet"
                  value={car.id}
                  checked={selectedCar === car}
                  onChange={() => handleCarSelection(car)}
                  className="absolute top-2 left-2 opacity-0 w-4 h-4"
                  required
                />
                <img
                  className="h-44 w-full ml-2 object-cover"
                  src={car.car_image}
                  alt={car.car_model}
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
