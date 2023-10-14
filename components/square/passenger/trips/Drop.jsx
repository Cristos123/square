"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { formatAndCalculateDaysAgo } from "../../carowners/programme/Trips";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const token = globalThis.window?.localStorage.getItem("passenger_accessToken");
const getPersengerId =
  globalThis.window?.localStorage.getItem("passenger_owner") || null;
const Drops = ({ car, onClick, tripId }) => {
  const [loading, setLoading] = useState(false);
  const handleJoinedTrip = async (e) => {
    setLoading(true);
    e.preventDefault();
    const joinTrips = {
      dropId: car.id,
      passengerId: getPersengerId,
      passengerTripId: tripId,
    };
    const json = JSON.stringify(joinTrips);
    try {
      toast("Please wait...");
      console.log(json);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}passenger-trips/join-trip`,
        json,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status == 201 || response.status == 200) {
        toast(response?.data?.message);
        console.log(json);
        setTimeout(() => globalThis?.window.location.reload(), 6000);
        setLoading(false);
      } else {
        toast("Failed to add Passenger trip");
        setLoading(false);
      }
    } catch (e) {
      toast(e?.response?.data?.message || e?.message);
      setLoading(false);
      console.log(e);
    }
  };
  console.log({ car });
  return (
    <>
      <div
        onClick={onClick}
        className="mx-auto cursor-pointer  rounded-xl shadow-md overflow-hidden w-full"
      >
        <div className="flex flex-row">
          <div className="flex-shrink-0">
            <img
              className="h-full w-36 sm:w-40 md:w-56 lg:w-64 object-contain "
              src={car.fleet?.car_image}
              alt={car.route_from}
            />
          </div>
          <div className="p-3 space-y-2  md:p-8 w-full">
            <div className="uppercase text-sm text-black font-semibold">
              {car.route_from} <ArrowForwardIcon fontSize="small" />{" "}
              {car.route_to}
            </div>
            <div className="flex  flex-col">
              <p className=" text-gray-400">Drops offs</p>
              <p className=" text-gray-500">{` ${car?.drop_off.join(", ")}`}</p>
            </div>{" "}
            <div className="flex  flex-col">
              <p className=" text-gray-400">Drops In</p>
              <p className=" text-gray-500">{` ${car?.drop_in.join(", ")}`}</p>
            </div>
            <div className="flex text-gray-400 flex-col ">
              <span>{car.car_seat_available} Seats Available</span>
              <span className="mr-2">
                {formatAndCalculateDaysAgo(car?.created_at)}
              </span>
            </div>
            <div className="text-right text-yellow-500">
              {loading === true ? (
                "Loading....."
              ) : (
                <JoinInnerIcon onClick={handleJoinedTrip} fontSize="large" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Drops;
