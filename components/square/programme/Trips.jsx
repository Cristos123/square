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
import EditProgrammeModal from "./EditProgramme.modal";
import { useState } from "react";
import useSWR from "swr";
import Loading from "@/components/loader/loading";
import moment from "moment";
import DropTripPassengerDetailsModal from "./DropTripPassengerDetails.modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";

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
export default function TripsHistory() {
  const [customizeModal, setCustomizeModal] = useState(false);
  const [showPassDetailsModal, setShowPassDetailsModal] = useState(false);
  const [showPassDetails, setShowPassDetails] = useState();
  const [editData, setEditData] = useState();
  const [dropId, setDropId] = useState();
  const [programmeId, setProgrammeId] = useState();
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}programme/organizer-users/${getUserId}`,

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

  // console.log({ data, error });
  if (isLoading) {
    return <Loading />;
  }

  const combinedData =
    data?.getall?.length > 0 &&
    data?.getall?.map((item, index) => ({
      programme: item,
      count: data?.counts[index], // Assuming counts has the same length as findBYUser
    }));
  return (
    <div className="mb-5  space-y-5 w-full">
      <EditProgrammeModal
        open={customizeModal}
        data={editData}
        programmeId={programmeId}
        onClose={() => setCustomizeModal(false)}
      />{" "}
      <DropTripPassengerDetailsModal
        open={showPassDetailsModal}
        data={showPassDetails}
        dropId={dropId}
        onClose={() => setShowPassDetailsModal(false)}
      />
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        <div className=" py-4">
          <p className="px-2 text-center font-semibold md:text-xl text-base">
            Programmes
          </p>
        </div>

        {combinedData?.length > 0 &&
          combinedData?.map((history, index) => (
            <ListItem
              key={index}
              sx={{
                // display: "flex",
                width: "100%",
                // cursor: "pointer",

                color: "black",
              }}
              className="flex w-full py-3 items-center justify-between "
            >
              <ListItemIcon className="text-black">
                <img
                  src="/assets/qr-code.png"
                  className="h-8 w-8 "
                  alt="qrcode"
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      // cursor: "pointer",
                      // alignItems: "center",
                    }}
                  >
                    <p
                      onClick={() => {
                        setCustomizeModal(true);
                        setEditData(history?.programme);
                        setProgrammeId(history?.programme?.id);
                      }}
                      className="cursor-pointer"
                    >
                      {history?.programme?.full_name}{" "}
                    </p>
                    <Link
                      href={`/crm/square/programme/${history?.programme?.id}`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 bg-yellow-500 text-black rounded-full`}
                      >
                        <div
                          className={`flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full`}
                        >
                          {history?.count}
                        </div>
                      </div>
                    </Link>
                  </div>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Start Date: {history?.programme?.start_date}
                    </Typography>
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                    >
                      End Date: {history?.programme?.end_date}
                    </Typography>{" "}
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                    >
                      <strong>{history?.programme?.venue}</strong>
                    </Typography>
                    {/* <div className="text-left flex justify-start py-4">
                      <AvatarGroup
                        onClick={() => {
                          setShowPassDetailsModal(true);
                          setShowPassDetails(history?.passenger);
                          setDropId(history);
                        }}
                        className="text-left cursor-pointer"
                      >
                        {history?.passenger?.map(
                          (passenger, index) => (
                            console.log(passenger),
                            (
                              <Avatar
                                key={index}
                                alt="Remy Sharp"
                                src={passenger?.portrait}
                              />
                            )
                          )
                        )}
                      </AvatarGroup>
                    </div> */}
                    <div className="flex  justify-between space-y-5 md:space-y-2">
                      <span className="mr-2 text-xs">
                        {formatAndCalculateDaysAgo(history?.created_at)}
                      </span>
                      {/* {history.isSuspend ? (
                        <span className="text-sm ">Drop Suspended</span>
                      ) : (
                        <>
                          {history?.passenger?.length == 0 && (
                            <AlertDialog dropId={history?.id} />
                          )}
                        </>
                      )} */}
                    </div>
                  </React.Fragment>
                }
              ></ListItemText>
            </ListItem>
          ))}
      </List>
    </div>
  );
}
