"use client";

import moment from "moment";
import React from "react";

const Fleets = ({ car, onClick, carImage }) => {
  console.log({ carImage });
  const createdDate = moment(car?.created_at);
  const currentDate = moment();

  // Calculate the number of days between the two dates
  const daysCreated = currentDate.diff(createdDate, "days");

  // Format the date with both date and time and add the days count
  const formattedDate =
    createdDate.format("LT, ll - ") + `${daysCreated} days ago`;
  return (
    <div
      onClick={onClick}
      className="mx-auto cursor-pointer  rounded-xl shadow-md overflow-hidden w-full"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-contain md:w-48"
            src={car?.banner_image_url}
            alt={carImage?.banner_image_url}
          />
        </div>
        <div className="p-8 space-y-5">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {car.name}
            {/* | <span className="mt-2 ">{` ${car.plate_number}`}</span> */}
          </div>
          <div className="uppercase tracking-wide text-sm text-gray-400">
            {car.email}
          </div>{" "}
          <div className="uppercase tracking-wide text-sm text-gray-400">
            {car.phone_1}
          </div>{" "}
          <div className="uppercase tracking-wide text-sm text-gray-400">
            {car.address}
          </div>
          {/* <p className="mt-2 text-gray-400">{` ${car.year_purchased}`}</p>
          <p className="my-2 text-gray-400">{` ${
            car.condition === "fairlyUsed" ? "Fairly Used" : car.condition
          }`}</p> */}
          <p className="text-gray-400  text-sm">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Fleets;
