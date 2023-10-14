"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";

import InputSelect from "@/components/inputsComponent/InputSelect";
import {
  Autocomplete,
  Card,
  Chip,
  Container,
  ListItem,
  Paper,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import useSWR from "swr";

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
const purchased = [
  {
    value: "fairlyUsed",
    label: "Fairly Used",
  },
  {
    value: "new",
    label: "New",
  },
];

const dropIn = [
  { title: "InstaDrop MayFair", value: "InstaDropMayFair" },
  {
    title: "InstaDrop Campus Gate Bridge",
    value: "InstaDropCampusGateBridge",
  },
  { title: "InstaDrop OUI", value: "InstaDropOUI" },
  { title: "InstaDrop SUB Car Park", value: "InstaDropSUBCarPark" },
  { title: "InstaDrop Lagere", value: "InstaDropLagere" },
  { title: "InstaDrop Damico", value: "InstaDropDamico" },
  { title: "InstaDrop Asherifa", value: "InstaDropAsherifa" },
];
const dropOut = [
  { title: "Iwo Road, Ibadan", value: "IwoRoadIbadan" },
  {
    title: "Interchange, Ogun",
    value: "InterchangeOgun",
  },
  { title: "Redemption Camp, Ogun", value: "RedemptionCamp" },
  { title: "Magboro, Ogun", value: "Magboro" },
  { title: "Berger, Ogun", value: "Berger" },
  { title: "Ojota, Lagos", value: "Ojota" },
  { title: "Oshodi, Lagos", value: "Oshodi" },
  { title: "Obalende, Lagos", value: "Obalende" },
];
const token = globalThis.window?.localStorage.getItem("accessToken");
const getCarownerId =
  globalThis.window?.localStorage.getItem("car_owner_user") || null;
export default function CheckInTripModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [drop, setDrop] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [selectedDriver, setSelectedDriver] = useState();
  const [drop_in, setDropIn] = useState([]);
  const [drop_off, setDropOff] = useState([]);
  const [checkInCheckout, setcheckinCheckout] = useState();
  console.log({ drop_in, drop_off, drop, selectedDriver });

  useEffect(() => {
    if (drop == null) {
    }
    if (props.open == false) {
    }
  }, [drop, props.open]);
  const handleCarSelection = (car) => {
    setSelectedCar(car);
  };
  console.log("props?.dropId?", props?.dropId);
  const handleClick = (obj) => {
    // 👇️ take the parameter passed from the Child component
    setAddressData((emp) => ({ ...emp, ...obj }));
    setPlace(obj[1]?.replaceAll(",", ""));
    setOtherAddress(
      obj?.slice(2)?.join("/").replaceAll("/", "").replaceAll(",", ", ") || ""
    );

    console.log("argument from Child: ", obj);
  };
  const currentDateTime = new Date().toISOString().slice(0, 16);
  // setValue("date", currentDateTime);
  // console.log({ drop });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const json = JSON.stringify(checkInCheckout);
    try {
      toast("Please wait...");
      console.log({ json });

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}carowner/drop/checkout-checkin/${props?.dropId}`,
        json,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        toast(response?.data?.message);
        setTimeout(() => globalThis?.window.location.reload(), 6000);
        setLoading(false);
      } else {
        toast(response?.data?.message);
        setLoading(false);
      }
    } catch (e) {
      toast(e?.response?.data?.message || e?.message);
      setLoading(false);
      console.log(e);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Perform any desired actions with the selected image
      // For example, you can upload the image to a server or process it

      // Here, we're simply logging the file information to the console
      console.log("Selected image:", file);

      // You can also use FileReader to read the image content if needed
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        console.log("Image Data URL:", imageDataURL);
      };
      reader.readAsDataURL(file);
    }

    setSelectedImage(file);

    if (onChange) {
      onChange(file);
    }
  };
  const handleChange = (e) => {
    setcheckinCheckout((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" p-2   justify-center overflow-y-auto"
      >
        {/* <div className=" container flex flex-col justify-center mx-auto items-center bg-white p-6 overflow-y-auto">
         */}

        <Box sx={style}>
          <div className=" flex justify-center items-center bg-white p-6 overflow-y-auto">
            <form
              className="w-full flex flex-col md:w-2/3 lg:w-1/2 mx-auto mb-24 sm:text-xs my-auto"
              onSubmit={handleSubmit}
            >
              <h2 className="font-semibold py-5 text-center ">Checkin Drop</h2>
              <div className="font-bold mt-4">
                Check In
                <span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder=" Check in token"
                name="check_in"
                onChange={handleChange}
                required
                disabled={loading}
                value={checkInCheckout?.check_in}
              />{" "}
              <div className="text-right mt-6">
                <button
                  type="submit"
                  className="bg-transparent text-right py-3 px-3 rounded-2xl border-yellow-500 border"
                >
                  {"CheckIn"}
                </button>
              </div>
              {/* <>
                <div className="font-bold mt-4">
                  Check Out
                  <span className="text-red-500 my-auto">*</span>
                </div>
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                  placeholder=" Checkout token"
                  name="check_out"
                  onChange={handleChange}
                  required
                  disabled={loading}
                  value={checkInCheckout?.check_out}
                />{" "}
                <div className="text-right mt-6">
                  <button
                    type="submit"
                    className="bg-transparent text-right py-3 px-3 rounded-2xl border-yellow-500 border"
                  >
                    {"CheckOut"}
                  </button>
                </div>
              </> */}
              <div className="flex mx-auto w-full">
                <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                  <button
                    type="button"
                    onClick={props.onClose}
                    className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="p-2 bg-black w-full text-white mt-4 rounded-md"
                    disabled={loading}
                    type={"submit"}
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
