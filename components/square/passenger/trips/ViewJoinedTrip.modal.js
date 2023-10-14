"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import useSWR from "swr";
import Loading from "@/components/loader/loading";

import InputSelect from "@/components/inputsComponent/InputSelect";
import {
  Autocomplete,
  Card,
  CardContent,
  Container,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FilePond } from "react-filepond";
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "@/cloudinary/cloudinaryHelper";
import NairaIcon from "@/components/NairaIcon";
import Link from "next/link";
import moment from "moment";
import { formatAndCalculateDaysAgo } from "../../carowners/programme/Trips";

const locationoptions = [
  { value: "", label: "Select Job location" },
  { value: "onsite", label: "Onsite" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];
const updateStatus = [
  { value: "", label: "Select routine status" },
  { value: "not_approved", label: "Not Aprroved" },
  { value: "approved", label: "Approved" },
];
const PerformanceUpdateStatus = [
  { value: "", label: "Select routine status" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];
const proveRequired = [
  { value: "", label: "Select prove" },
  { value: "false", label: "False" },
  { value: "true", label: "True" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
};

const editorOptions = {
  autosave: {
    enabled: true,
    uniqueId: "my-unique-id",
    delay: 1000,
  },
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "quote",
    "|",
    "preview",
    "side-by-side",
    "fullscreen",
  ],
};
const token = globalThis.window?.localStorage.getItem("passenger_accessToken");
const getPersengerId =
  globalThis.window?.localStorage.getItem("passenger_owner") || null;
export default function ViewJoinedTripModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [passengerTripEdit, setPassengerTripEdit] = useState();
  const [luggage, setLuggage] = useState(null);

  const handleClick = (obj) => {
    // 👇️ take the parameter passed from the Child component
    setAddressData((emp) => ({ ...emp, ...obj }));
    setPlace(obj[1]?.replaceAll(",", ""));
    setOtherAddress(
      obj?.slice(2)?.join("/").replaceAll("/", "").replaceAll(",", ", ") || ""
    );

    console.log("argument from Child: ", obj);
  };
  console.log("props?.data?.idd", props?.data);
  useEffect(() => {
    if (passengerTripEdit == null) {
      setPassengerTripEdit(props?.data);
    }
    if (props.open == false) {
      setPassengerTripEdit(props?.data);
    }
  }, [passengerTripEdit, props.open]);

  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${token}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}passenger-trips/drop-joined/${props.data?.drop?.id}`,

    fetcher
  );
  console.log({ data });

  // const createdDate = moment(data?.updated_at);
  // const currentDate = moment();

  // // Calculate the number of days between the two dates
  // const daysCreated = currentDate.diff(createdDate, "days");

  // // Format the date with both date and time and add the days count
  // const formattedDate =
  //   createdDate.format("LT, ll - ") + `${daysCreated} days ago`;

  // const createdDate = moment(data?.updated_at);
  // const currentDate = moment();

  // // Calculate the number of minutes between the two dates
  // const minutesCreated = currentDate.diff(createdDate, "hour");

  // // Format the date with both date and time and add the minutes count
  // const formattedDate =
  //   createdDate.format("LT, ll - ") + `${minutesCreated} hours ago`;

  const createdDate = moment(data?.updated_at);
  const currentDate = moment();

  // Calculate the difference in minutes
  const minutesCreated = currentDate.diff(createdDate, "minutes");

  let formattedDate = "";

  if (minutesCreated < 60) {
    // Less than 60 minutes, display in minutes
    formattedDate = `${minutesCreated} minutes ago`;
  } else if (minutesCreated < 1440) {
    // Less than 24 hours, display in hours
    const hoursCreated = Math.floor(minutesCreated / 60);
    formattedDate = `${hoursCreated} hours ago`;
  } else {
    // More than 24 hours, display in days
    const daysCreated = Math.floor(minutesCreated / 1440);
    formattedDate = `${daysCreated} days ago`;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" p-2  justify-center overflow-y-auto"
      >
        <Box sx={style}>
          <div className=" my-10 flex justify-center items-center bg-white p-6 overflow-y-auto">
            <form className="w-full relative flex flex-col  lg:w-1/2 mx-auto mb-24 sm:text-xs my-auto">
              {/* <div className="text-right p-4">
                <CloseIcon fontSize="large" />
              </div> */}
              <h2 className="font-semibold py-8 text-center text-2xl">
                Drop Details
              </h2>

              <div className="mx-auto cursor-pointer  rounded-xl overflow-hidden w-full">
                <div className="flex flex-col">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-full w-full object-contain md:w-full"
                      src={data?.fleet?.car_image}
                      alt={data?.carName}
                    />
                  </div>
                  <div className="p-8 space-y-5">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {data?.fleet?.car_model} |{" "}
                      <span className="mt-2 ">{` ${data?.fleet?.plate_number}`}</span>
                    </div>
                    <div className="uppercase tracking-wide text-sm text-gray-400">
                      {data?.fleet?.year_purchased} |{" "}
                      <span className="mt-2 ">{` ${
                        data?.fleet?.condition === "fairlyUsed"
                          ? "Fairly Used"
                          : data?.fleet?.condition
                      }`}</span>
                    </div>

                    {/* <p className="mt-2 text-gray-400">{` ${car.year_purchased}`}</p>
          <p className="my-2 text-gray-400">{` ${
            car.condition === "fairlyUsed" ? "Fairly Used" : car.condition
          }`}</p> */}
                    <p className="text-gray-400  text-sm">
                      {" "}
                      Joined at: {formatAndCalculateDaysAgo(data?.updated_atl)}
                    </p>

                    <div className="space-y-3">
                      <p className="text-lg font-semibold "> Note:</p>
                      <p className="text-gray-400  text-sm">
                        Make sure you arrived atleast 10 minutes before the time{" "}
                      </p>
                      <p className="text-gray-400  text-sm">
                        Sitting arrangement is at everyone discretion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <button
            onClick={props.onClose}
            type="button"
            className="p-2 bg-black text-white text-center fixed bottom-0 w-12 h-12 rounded-full right-10"
          >
            <div className="my-auto mx-auto">
              <CloseIcon />{" "}
            </div>
          </button>
        </Box>
      </Modal>
    </div>
  );
}
