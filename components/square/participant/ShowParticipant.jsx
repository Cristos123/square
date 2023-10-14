"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  IconButton,
  ListItemIcon,
  Stack,
  TextField,
} from "@mui/material";
import NairaIcon from "@/components/NairaIcon";
import AddIcon from "@mui/icons-material/Add";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EditProgrammeModal from "../programme/EditProgramme.modal";
import { useState } from "react";
import useSWR from "swr";
import Loading from "@/components/loader/loading";
import moment from "moment";
import DropTripPassengerDetailsModal from "../programme/DropTripPassengerDetails.modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AlertDialog from "../popupNotification/PopupNotification";
import Link from "next/link";
import EditParticipantModal from "./EditParticipant.modal";
import ParticipantCard from "./ParticipantCard";

const options = [
  "Show some love to MUI",
  "Show all notification content",
  "Hide sensitive notification content",
  "Hide all notification content",
];

function SimpleListMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "background.paper" }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={<MoreVertIcon />}
            // secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
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

export function formatAndCalculateDaysAgo(date) {
  const createdDate = moment(date);
  const currentDate = moment();

  // Calculate the difference in days
  const daysCreated = currentDate.diff(createdDate, "days");

  let formattedDate = createdDate.format("LT, ll - ");

  if (daysCreated < 1) {
    // Less than 1 day, calculate and display in hours
    const hoursCreated = currentDate.diff(createdDate, "hours");
    if (hoursCreated < 1) {
      // Less than 1 hour, calculate and display in minutes
      const minutesCreated = currentDate.diff(createdDate, "minutes");
      formattedDate += `${minutesCreated} minutes ago`;
    } else {
      formattedDate += `${hoursCreated} hours ago`;
    }
  } else {
    formattedDate += `${daysCreated} days ago`;
  }

  return formattedDate;
}

// function formatAndCalculateDaysAgo(date) {
//   // const createdDate = moment(date);
//   // const currentDate = moment();

//   // // Calculate the number of days between the two dates
//   // const daysCreated = currentDate.diff(createdDate, "days");

//   // // Format the date with both date and time and add the days count
//   // return createdDate.format("LT, ll - ") + `${daysCreated} days ago`;

//   const createdDate = moment(date);
//   const currentDate = moment();

//   // Calculate the difference in minutes
//   const minutesCreated = currentDate.diff(createdDate, "minutes");

//   let formattedDate = "";

//   if (minutesCreated < 60) {
//     // Less than 60 minutes, display in minutes
//     formattedDate = `${minutesCreated} minutes ago`;
//   } else if (minutesCreated < 1440) {
//     // Less than 24 hours, display in hours
//     const hoursCreated = Math.floor(minutesCreated / 60);
//     formattedDate = `${hoursCreated} hours ago`;
//   } else {
//     // More than 24 hours, display in days
//     const daysCreated = Math.floor(minutesCreated / 1440);
//     formattedDate = `${daysCreated} days ago`;
//   }
//   return formattedDate;
// }
const accessToken = globalThis.window?.localStorage.getItem("accessToken");
const getUserId =
  globalThis.window?.localStorage.getItem("organizer_user") || null;
export default function ParticipantPage(props) {
  const [customizeModal, setCustomizeModal] = useState(false);
  const [showPassDetailsModal, setShowPassDetailsModal] = useState(false);
  const [showPassDetails, setShowPassDetails] = useState();
  const [editData, setEditData] = useState();
  const [dropId, setDropId] = useState();
  const [participantId, setParticipantId] = useState();
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}participant/programme/${props?.programeId}`,

    fetcher
  );

  // const fetcherDriver = (...args) =>
  //   fetch(...args, {
  //     headers: { authorization: `Bearer ${accessToken}` },
  //   }).then((res) => res.json());
  // const {
  //   data: driverData,
  //   error: driverEror,
  //   isLoading: driverIsloading,
  // } = useSWR(
  //   `${process.env.NEXT_PUBLIC_ENDPOINT}programme/organizer-users/${getUserId}`,
  //   fetcher
  // );

  console.log({ data, error });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mb-5  space-y-5 w-full">
      <EditParticipantModal
        open={customizeModal}
        data={editData}
        participantId={participantId}
        onClose={() => setCustomizeModal(false)}
      />{" "}
      <DropTripPassengerDetailsModal
        open={showPassDetailsModal}
        data={showPassDetails}
        dropId={dropId}
        onClose={() => setShowPassDetailsModal(false)}
      />
      <div className="grid space-y-6  grid-cols-1 divide-y mb-32  my-7">
        <p className="px-2 text-center font-semibold md:text-xl text-base">
          Participants
        </p>
        {data?.length > 0 &&
          data?.map((participant, index) => (
            <ParticipantCard
              key={index}
              participant={participant}
              onClick={() => {
                setCustomizeModal(true);
                setEditData(participant);
                setParticipantId(participant.id);
              }}
            />
          ))}
        <button
          onClick={() => setNewDialog(true)}
          type="button"
          className="p-2 bg-blue-500 text-white text-center fixed bottom-28 w-12 h-12 rounded-full right-10"
        >
          <div className="my-auto mx-auto">
            <AddIcon />{" "}
          </div>
        </button>
      </div>
    </div>
  );
}
