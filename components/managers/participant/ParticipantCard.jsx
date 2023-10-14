"use client";

import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { formatAndCalculateDaysAgo } from "../programme/Trips";

const ParticipantCard = ({ participant, onClick, carImage }) => {
  console.log({ carImage });
  const createdDate = moment(participant?.created_at);
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
            src={participant?.event_image_url}
            alt={participant?.name}
          />
        </div>
        <div className="p-8 space-y-5">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {`${participant.first_name}  ${participant.middle_name !== null ? participant.middle_name : ''}   ${participant.last_name}`} 

            {/* | <span className="mt-2 ">{` ${participant.plate_number}`}</span> */}
          </div>
          {/* <div className="uppercase tracking-wide text-sm text-gray-400">
            {participant.email}
          </div>{" "} */}
          <div className="uppercase tracking-wide text-sm text-gray-400">
            {participant.phone_number}    {participant.phone_number2}
          </div>{" "}

          <Typography
            component="span"
            variant="body2"
            color="text.primary"
          >
            {participant.email}
          </Typography> <Typography
            component="span"
            variant="body2"
            color="text.primary"
          >
            {participant.gender}
          </Typography>
          <div className="uppercase tracking-wide text-sm text-gray-400">
            {participant.address}
          </div>
          {/* <p className="mt-2 text-gray-400">{` ${participant.year_purchased}`}</p>
          <p className="my-2 text-gray-400">{` ${
            participant.condition === "fairlyUsed" ? "Fairly Used" : participant.condition
          }`}</p> */}
          <p className="text-gray-400  text-sm">  {formatAndCalculateDaysAgo(participant?.created_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
