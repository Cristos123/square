"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

import InputSelect from "@/components/inputsComponent/InputSelect";
import {
  Autocomplete,
  Card,
  Chip,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import useSWR from "swr";
import { formatAndCalculateDaysAgo } from "./Trips";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckInTripModal from "./CheckInTrip.modal";
import CheckOutTripModal from "./CheckOutTrip.modal";

const options = [
  "Passenger Check in",
  "Passenger Check in",
  "Passenger Check Out",
];

function SimpleListMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
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

const token = globalThis.window?.localStorage.getItem("accessToken");
const getCarownerId =
  globalThis.window?.localStorage.getItem("car_owner_user") || null;
export default function DropTripPassengerDetailsModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [passenger, setPassenger] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [selectedDriver, setSelectedDriver] = useState();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [drop_off, setDropOff] = useState([]);
  const [ischeckIn, setIscheckIn] = useState(false);
  const [ischeckOut, setIscheckOut] = useState(false);
  const [showPassDetailsModal, setShowPassDetailsModal] = useState(false);
  const [checkInCheckout, setcheckinCheckout] = useState();
  const [dropId, setDropId] = useState();

  useEffect(() => {
    if (passenger == null) {
      setPassenger(props.data);
    }
    if (props.open == false) {
      setPassenger(props.data);
    }
  }, [passenger, props.open]);
  const handleCarSelection = (car) => {
    setSelectedCar(car);
  };
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
  console.log({ passenger });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const json = JSON.stringify(checkInCheckout);
    try {
      toast("Please wait...");
      console.log({ json });

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}carowner/drop/checkout-checkin/${props?.dropId?.id}`,
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

    setSelectedCar(file);

    if (onChange) {
      onChange(file);
    }
  };

  const handleCheckInClick = () => {
    setIscheckIn(!ischeckIn); // Toggle the check-in state
    setIscheckOut(false);
    // Clear the input field when toggling
  };
  const handleCheckOutClick = () => {
    setIscheckOut(!ischeckOut); // Toggle the check-in state
    setIscheckIn(false);
  };

  const handleChange = (e) => {
    setcheckinCheckout((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <CheckInTripModal
        open={showPassDetailsModal}
        onClose={() => setShowPassDetailsModal(false)}
        dropId={dropId}
      />{" "}
      <CheckOutTripModal
        open={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        dropId={dropId}
      />
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
          <div className=" flex justify-center items-center bg-white md:p-6 px-2 overflow-y-auto">
            <div className="grid  bg-white min-h-screen grid-cols-1 space-y-6 divide-y px-3 mb-28">
              <h2 className="py-5 text-center text-2xl">Passenger Details</h2>
              {passenger?.map((passengers) => (
                <>
                  <div
                    key={passengers?.id}
                    className="mx-auto cursor-pointer bg-white rounded-xl shadow-md overflow-hidden w-full"
                  >
                    <div className="flex flex-row">
                      <div className="flex-shrink-0">
                        <img
                          className="h-full w-36 sm:w-40 md:w-56 lg:w-64 object-cover "
                          src={passengers?.portrait}
                          alt={passengers?.carName}
                        />
                      </div>
                      <div className="p-1 md:p-8 w-full">
                        <div className="uppercase text-sm text-black font-semibold">
                          {passengers?.full_name}{" "}
                        </div>
                        <div className="flex py-3 justify-between">
                          <p className=" text-gray-400">{passengers?.phone}</p>
                          {/* <SimpleListMenu /> */}
                        </div>{" "}
                        <div className="flex py-3 flex-col">
                          <p className=" text-gray-400">{passengers?.email}</p>
                          {/* <p className=" text-gray-500">{` ${passenger?.drop_off.join(
                          ", "
                        )}`}</p> */}
                        </div>
                        <div className="flex py-4 md:py-0 md:flex-row flex-col space-x-3 text-gray-400 md:items-center">
                          <span className="text-xs">
                            {formatAndCalculateDaysAgo(passengers?.updated_at)}
                          </span>

                          {/* <div className="flex space-x-1 md:space-x-3">
                          {props?.dropId?.isCheck_in === false ? (
                            <span
                              onClick={handleCheckInClick}
                              className="text-yellow-500"
                            >
                              Check in
                            </span>
                          ) : (
                            <span
                              onClick={handleCheckInClick}
                              className="text-yellow-500"
                            >
                              Checked in
                            </span>
                          )}

                          <span>|</span>
                          {props?.dropId?.isCheck_in === true &&
                          props?.dropId?.isCheck_out === false ? (
                            <span
                              onClick={handleCheckOutClick}
                              className="text-yellow-500"
                            >
                              Check out
                            </span>
                          ) : (

                            
                            <span
                              onClick={handleCheckOutClick}
                              className="text-yellow-500"
                            >
                              Checked out
                            </span>
                          )}
                        </div> */}

                          <div className="flex space-x-1 md:space-x-3">
                            {passengers?.isCheck_in === false ? (
                              <span
                                onClick={() => {
                                  setShowPassDetailsModal(true);
                                  setDropId(props?.dropId?.id);
                                }}
                                className="text-yellow-500"
                              >
                                Check in
                              </span>
                            ) : (
                              <>
                                <span className="text-yellow-500">
                                  Checked in
                                </span>
                                <span>|</span>
                                {!passengers?.isCheck_out ? (
                                  <span
                                    onClick={() => {
                                      setShowCheckoutModal(true);
                                      setDropId(props?.dropId?.id);
                                    }}
                                    className="text-yellow-500"
                                  >
                                    Check out
                                  </span>
                                ) : (
                                  <span className="text-yellow-500">
                                    Checked out
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              {/* <form onSubmit={handleSubmit}>
                {ischeckIn && (
                  <>
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
                  </>
                )}{" "}
                {ischeckOut && (
                  <>
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
                  </>
                )}
              </form> */}
            </div>
          </div>

          <button
            onClick={props.onClose}
            type="button"
            className="p-2 bg-black text-white text-center fixed -bottom-12 w-12 h-12 rounded-full right-10"
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
