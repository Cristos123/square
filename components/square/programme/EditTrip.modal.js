"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { FilePond } from "react-filepond";
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
import CarSelectionForm from "./selectedCard";
import useSWR from "swr";
import NairaIcon from "@/components/NairaIcon";

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
export default function AddTripModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [programme, setProgramme] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [selectedDriver, setSelectedDriver] = useState();
  const [drop_in, setDropIn] = useState([]);
  const [drop_off, setDropOff] = useState([]);
  const [passport_url, setPassportUrl] = useState(null);
  console.log({ drop_in, drop_off, programme, selectedDriver });

  useEffect(() => {
    if (programme == null) {
      setProgramme(props.data);
      setDropIn(props.data);
      setDropOff(props.data);
      setSelectedCar(props.data);
      setSelectedDriver(props?.data?.driver);
    }
    if (props.open == false) {
      setProgramme(props.data);
      setDropIn(props.data);
      setDropOff(props.data);
    }
  }, [programme, props.open]);
  const handleCarSelection = (car) => {
    setSelectedCar(car);
  };
  console.log({ programme });
  const handleClick = (obj) => {
    // 👇️ take the parameter passed from the Child component
    setAddressData((emp) => ({ ...emp, ...obj }));
    setPlace(obj[1]?.replaceAll(",", ""));
    setOtherAddress(
      obj?.slice(2)?.join("/").replaceAll("/", "").replaceAll(",", ", ") || ""
    );

    console.log("argument from Child: ", obj);
  };

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponse,
    });
  };

  const processs = async (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const abortRequest = makeUploadRequest({
      file,
      fieldName,
      successCallback: load,
      errorCallback: error,
      progressCallback: progress,
      responseCallback: handleResponse,
    });

    return {
      abort: () => {
        abortRequest.abort();
        abort();
      },
    };
  };

  const handleResponse = (response) => {
    handleRichTextChange("photo_1", response?.secure_url);
  };

  const resetResponse = () => {
    handleRichTextChange("photo_1", "");
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);
  // setValue("date", currentDateTime);
  console.log({ programme });
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    delete programme.undefined;

    const dropInValues = drop_in?.map((item) => item.title);
    const dropOffValues = drop_off?.map((item) => item.title);
    console.log({ dropInValues, dropOffValues });
    programme.drop_in = dropInValues;
    programme.drop_off = dropOffValues;
    delete programme.id;
    delete programme.created_at;
    delete programme.updated_at;
    const json = JSON.stringify(programme);
    try {
      toast("Please wait...");
      console.log({ json });

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}carowner/programme/${props?.data?.id}`,
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
    setProgramme((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ["carowner_user"]: getCarownerId,
      ["fleet"]: selectedCar?.id,
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
              <h2 className="font-semibold py-5 text-center ">
                Create A Programme
              </h2>
              <h2 className="font-medium  text-center ">
                Help people move at half the cost
              </h2>
              {/* <h5 className="text-center font-semibold py-5">Routine</h5> */}
              <div className="font-bold mt-4">
                Names <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-full focus:outline-none"
                  placeholder="Full name"
                  type={"text"}
                  // value={driver?.driver_first_name}
                  onChange={handleChange}
                  required
                  name="driver_first_name"
                  disabled={loading}
                />
              </div>{" "}
              <div className="font-bold mt-4">
                Description <span className="text-red-500 my-auto">*</span>
              </div>
              <textarea
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder=" Note"
                value={programme?.description}
                onChange={handleChange}
                name="note"
              />
              <div className=" mt-4">
                Date <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full mb-4">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="Date"
                  type="date"
                  name="start_date"
                  // defaultValue={new Date().toISOString().split("T")[0]} // Set default value to today's date
                  value={programme?.schedule_date}
                  onChange={handleChange}
                  required
                />

                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="Time"
                  type="date"
                  name="end_date"
                  // defaultValue={new Date().toLocaleTimeString([], {
                  //   hour: "2-digit",
                  //   minute: "2-digit",
                  // })} // Set default value to current time (hours and minutes only)
                  value={programme?.schedule_time}
                  onChange={handleChange}
                  required
                />
              </div>{" "}
              {/* {days > 0 && (
                <div className="py-3">
                  <p>Durations: {days} days</p>
                </div>
              )} */}
              <div className=" mt-4">
                Organizer <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full mb-4">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-full focus:outline-none"
                  placeholder="From"
                  type={"text"}
                  name="route_from"
                  value={programme?.route_from}
                  onChange={handleChange}
                  required
                />
              </div>{" "}
              <div className="py-5 space-y-6">
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={dropIn}
                  onChange={(event, newValue) => {
                    console.log({ newValue });

                    setDropIn(newValue);
                  }}
                  getOptionLabel={(option) => option?.title}
                  // defaultValue={"Select an Options"}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="organizer"
                      variant="standard"
                      label="Organizer"
                      value={programme?.organizer}
                      placeholder="Select Manager"
                    />
                  )}
                />
              </div>
              <div className=" mt-4">
                Allowance <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex relative w-full mb-4">
                <input
                  className="p-2 border pl-6 md:pl-5 bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="Participant Allowance"
                  type={"number"}
                  name="participant_allowance"
                  value={programme?.participant_allowance}
                  onChange={handleChange}
                  required
                /><span className="absolute inset-y-0 left-2   flex items-center">
                  <NairaIcon />
                </span>
                <input
                  className="p-2 border pl-6 md:pl-5 bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="Manager Allowance"
                  type={"number"}
                  name="manager_allowance"
                  value={programme?.manager_allowance}
                  onChange={handleChange}
                  required
                />
           

                 <span className="absolute inset-y-0  right-[170px] sm:right-[300px] md:right-[230px] lg:right-[450px]  flex items-center">
                  <NairaIcon />
                </span>
             
              </div>{" "}
              <div className=" mt-4">
                Participant Tfare{" "}
                <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex relative w-full mb-4">
                <input
                  className="p-2 border pl-6 md:pl-4 relative bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="Rate"
                  type={"number"}
                  name="participant_rate"
                  value={programme?.participant_rate}
                  onChange={handleChange}
                  required
                />  <span className="absolute inset-y-0 left-2   flex items-center">
                  <NairaIcon />
                </span>
                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="Distance"
                  type={"number"}
                  name="participant_distance"
                  value={programme?.participant_distance}
                  onChange={handleChange}
                  required
                /> <span className="absolute inset-y-0 right-2 flex items-center">
                  km
                </span>
              </div>{" "}
              <div className=" mt-4">
                Manager Tfare <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex relative w-full mb-4">
                <input
                  className="p-2 border pl-6  md:pl-4 relative bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="Rate"
                  type={"number"}
                  name="manager_rate"
                  value={programme?.manager_rate}
                  onChange={handleChange}
                  required
                />
                <span className="absolute inset-y-0 left-2   flex items-center">
                  <NairaIcon />
                </span>
                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="Distance"
                  type={"number"}
                  name="manager_distance"
                  value={programme?.manager_distance}
                  onChange={handleChange}
                  required
                />
                <span className="absolute inset-y-0 right-2 flex items-center">
                  km
                </span>
              </div>
              <div className="font-bold mt-4">
                Venue
                <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-full focus:outline-none"
                  placeholder=" car seat available"
                  name="venue"
                  onChange={handleChange}
                  required
                  disabled={loading}
                  value={programme?.venue}
                  type="text"
                />
              </div>
              <div className="py-5 space-y-6">
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={dropIn}
                  onChange={(event, newValue) => {
                    console.log({ newValue });

                    setDropIn(newValue);
                  }}
                  getOptionLabel={(option) => option?.title}
                  // defaultValue={"Select an Options"}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="manager"
                      variant="standard"
                      label="Manager"
                      value={programme?.manager}
                      placeholder="Select Manager"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-8 md:flex space-x-4 md:w-1/2 mx-auto">
                  <div className="h-48 w-full bg-gray-200  mx-auto  mb-4">
                    <FilePond
                      stylePanelLayout={"integrated"}
                      styleLoadIndicatorPosition={"center bottom"}
                      styleProgressIndicatorPosition={"right bottom"}
                      styleButtonRemoveItemPosition={"left bottom"}
                      styleButtonProcessItemPosition={"right bottom"}
                      // ref={profilePic}
                      files={passport_url}
                      acceptedFileTypes={["image/*"]}
                      onupdatefiles={setPassportUrl}
                      allowMultiple={false}
                      maxFiles={1}
                      server={{ process, revert }}
                      name="file" /* sets the file input name, it's filepond by default */
                      labelIdle=' <span class="filepond--label-action">event image</span>'
                    />
                  </div>
                </div>{" "}
                <div className="mb-8 md:flex space-x-4 md:w-1/2 mx-auto">
                  <div className="h-48 w-full bg-gray-200  mx-auto  mb-4">
                    <FilePond
                      stylePanelLayout={"integrated"}
                      styleLoadIndicatorPosition={"center bottom"}
                      styleProgressIndicatorPosition={"right bottom"}
                      styleButtonRemoveItemPosition={"left bottom"}
                      styleButtonProcessItemPosition={"right bottom"}
                      // ref={profilePic}
                      files={passport_url}
                      acceptedFileTypes={["image/*"]}
                      onupdatefiles={setPassportUrl}
                      allowMultiple={false}
                      maxFiles={1}
                      server={{ process, revert }}
                      name="file" /* sets the file input name, it's filepond by default */
                      labelIdle=' <span class="filepond--label-action">programme</span>'
                    />
                  </div>
                </div>
              </div>
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
