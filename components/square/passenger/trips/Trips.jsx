"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Autocomplete, ListItemIcon, Stack, TextField } from "@mui/material";
import NairaIcon from "@/components/NairaIcon";
import AddIcon from "@mui/icons-material/Add";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EditTripModal from "./EditTrip.modal";
import { useState } from "react";
import CardTrips from "./CardTrips";
import SearchIcon from "@mui/icons-material/Search";
import useSWR from "swr";
import Loading from "@/components/loader/loading";
const formatDate = (date) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const day = new Date(date).getDate();
  const daySuffix = getDaySuffix(day);

  return `${formattedDate}`;
};
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const currentDate = new Date();
const tripsHistory = [
  {
    id: 1,
    from: "Abuja",
    to: " Surulere, Lagos",
    dropIn: "Coffee Shop",
    dropOff: "Workplace",
    passengerNumber: 10,
    date: new Date("2023-08-01"),
    time: "09:00 AM",
    fee: 2600,
    icon: <DriveEtaIcon fontSize="medium" />,
  },
  {
    id: 2,
    from: "Ile-ife, Osun",
    to: "Ojota, Lagos",
    dropIn: "Cafeteria",
    dropOff: "Hotel Lobby",
    passengerNumber: 20,
    date: new Date("2023-07-15"),
    time: "02:30 PM",
    fee: 2600,
    icon: <DriveEtaIcon fontSize="medium" />,
  },
  {
    id: 3,
    from: "Oshodi, Lagos",
    to: "Owo, Akure",
    dropIn: "Gas Station",
    dropOff: "Supermarket",
    passengerNumber: 5,
    date: new Date("2023-09-05"),
    time: "11:00 AM",
    fee: 2600,
    icon: <DriveEtaIcon fontSize="medium" />,
  },
  {
    id: 4,
    from: "V.I, Lagos",
    to: "Okitipupa, Akure",
    dropIn: "Gas Station",
    dropOff: "Supermarket",
    date: new Date("2023-09-05"),
    passengerNumber: 6,
    time: "11:00 AM",
    fee: 2600,
    icon: <DriveEtaIcon fontSize="medium" />,
  },
  {
    from: "Surulere,Lagos",
    to: " Ondo-town, Akure",
    dropIn: "Gas Station",
    dropOff: "Supermarket",
    passengerNumber: 15,
    date: new Date("2023-09-05"),
    time: "11:00 AM",
    fee: 2600,
    icon: <DriveEtaIcon fontSize="medium" />,
    id: 5,
  },
];

const token = globalThis.window?.localStorage.getItem("passenger_accessToken");
const getPersengerId =
  globalThis.window?.localStorage.getItem("passenger_owner");
export default function TripsPassengerHistory() {
  const [customizeModal, setCustomizeModal] = useState(false);
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${token}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}passenger-trips/user/${getPersengerId}`,
    fetcher
  );
  console.log({ data });

  if (isLoading) {
    return <Loading />;
  }

  const combinedData = data?.findBYUser.map((item, index) => ({
    passengerTrip: item,
    count: data?.counts[index], // Assuming counts has the same length as findBYUser
  }));
  console.log({ combinedData });
  return (
    <div className="mb-5  space-y-5 ">
      <h2 className="font-bold text-center py-2 ">Trips</h2>

      <div className="flex items-center border rounded-md p-2">
        <input
          className="w-full relative rounded-lg  px-5 py-3 outline-none border border-gray-400 text-gray-700"
          type="text"
          placeholder="Search..."
        />
        <div className="absolute right-8 md:right-14 ">
          <SearchIcon />
        </div>
      </div>
      {combinedData?.map((history, index) => (
        <CardTrips key={index} history={history} />
      ))}
    </div>
  );
}
