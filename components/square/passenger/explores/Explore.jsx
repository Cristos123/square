"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { formatAndCalculateDaysAgo } from "../../carowners/programme/Trips";
const Explores = ({ car, onClick }) => {
  console.log({ car });
  return (
    <>
      <div
        onClick={onClick}
        className="mx-auto cursor-pointer bg-white rounded-xl shadow-md overflow-hidden w-full"
      >
        <div className="flex flex-row">
          <div className="flex-shrink-0">
            <img
              className="h-full w-36 sm:w-40 md:w-56 lg:w-64 object-cover "
              src={car.fleet?.car_image}
              alt={car.carName}
            />
          </div>
          <div className="p-3 md:p-8 w-full">
            <div className="uppercase text-sm text-black font-semibold">
              {car.route_from} <ArrowForwardIcon fontSize="small" />{" "}
              {car.route_to}
            </div>
            {/* <div className="flex py-3 flex-col">
              <p className=" text-gray-400">Meeting points</p>
              <p className=" text-gray-500">{` ${car.meetingPoint}`}</p>
            </div> */}
            <div className="flex py-3 flex-col">
              <p className=" text-gray-400">Drops In</p>
              <p className=" text-gray-500">{` ${car.drop_in.join(", ")}`}</p>
            </div>{" "}
            <div className="flex py-3 flex-col">
              <p className=" text-gray-400">Drops offs</p>
              <p className=" text-gray-500">{` ${car.drop_off.join(", ")}`}</p>
            </div>
            {/* <div className="flex text-gray-400 items-center">
              <span className="mr-2">
                {car.date.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
              <span>
                {car.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>{" "}
              <span>{car.seats} Seats</span>
            </div> */}
            <div className="flex text-gray-400 items-center">
              {formatAndCalculateDaysAgo(car?.created_at)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Explores;
