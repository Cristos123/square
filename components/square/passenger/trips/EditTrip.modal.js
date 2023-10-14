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
  Container,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FilePond } from "react-filepond";
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "@/cloudinary/cloudinaryHelper";

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
export default function AddTripPassengerModal(props) {
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

  const handleRichTextChange = (name, value) => {
    setPassengerTripEdit((prev) => ({
      ...prev,
      [name]: value,
      ["passenger_user"]: getPersengerId,
    }));
  };
  const handleResponse = (response) => {
    handleRichTextChange(response?.secure_url, "luggage");
  };

  const resetResponse = () => {
    handleRichTextChange("", "luggage");
  };
  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponse,
    });
  };

  const processLuggageImage = async (
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
  const currentDateTime = new Date().toISOString().slice(0, 16);

  const handleSubmit = async (e) => {
    console.log("props?.data?.id", props?.data?.id, "passengerTripEdit:"),
      passengerTripEdit;
    setLoading(true);
    e.preventDefault();
    delete passengerTripEdit.id;
    delete passengerTripEdit.created_at;
    delete passengerTripEdit.updated_at;
    delete passengerTripEdit.drop;
    const json = JSON.stringify(passengerTripEdit);
    try {
      toast("Please wait...");
      console.log(json, "props?.data?.id", props?.data?.tripId);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}passenger-trips/${props?.tripId}`,
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
        toast("Failed to edit Passenger trip");
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
    setPassengerTripEdit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ["passenger_user"]: getPersengerId,
    }));
  };
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
          <div className=" flex justify-center items-center bg-white p-6 overflow-y-auto">
            <form
              className="w-full flex flex-col md:w-2/3 lg:w-1/2 mx-auto mb-24 sm:text-xs my-auto"
              onSubmit={handleSubmit}
            >
              {/* <h5 className="text-center font-semibold py-5">Routine</h5> */}
              <h2 className="font-semibold py-5 text-center ">Edit Trip</h2>
              <h2 className="font-medium  text-center ">
                Help people move at half the cost
              </h2>
              <div className=" mt-4">
                Schedule <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full mb-4">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="Date"
                  type="date"
                  name="schedule_date"
                  // defaultValue={new Date().toISOString().split("T")[0]} // Set default value to today's date
                  value={passengerTripEdit?.schedule_date}
                  onChange={handleChange}
                />

                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="Time"
                  type="time"
                  name="schedule_time"
                  // defaultValue={new Date().toLocaleTimeString([], {
                  //   hour: "2-digit",
                  //   minute: "2-digit",
                  // })} // Set default value to current time (hours and minutes only)
                  value={passengerTripEdit?.schedule_time}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className=" mt-4">
                Route <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full mb-4">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="From"
                  type={"text"}
                  name="route_from"
                  value={passengerTripEdit?.route_from}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="To"
                  type={"text"}
                  name="route_to"
                  value={passengerTripEdit?.route_to}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-8 md:flex space-x-4 md:w-1/2 mx-auto">
                <div className="h-48 w-full bg-gray-400  mx-auto  my-4">
                  <FilePond
                    imagePreviewHeight={170}
                    imageCropAspectRatio={"3:1"}
                    imageResizeTargetWidth={600}
                    imageResizeTargetHeight={200}
                    stylePanelLayout={"integrated"}
                    styleLoadIndicatorPosition={"center bottom"}
                    styleProgressIndicatorPosition={"right bottom"}
                    styleButtonRemoveItemPosition={"left bottom"}
                    styleButtonProcessItemPosition={"right bottom"}
                    // ref={profilePic}
                    files={luggage}
                    acceptedFileTypes={["image/*"]}
                    onupdatefiles={setLuggage}
                    allowMultiple={false}
                    maxFiles={1}
                    server={{ processLuggageImage, revert }}
                    name="file" /* sets the file input name, it's filepond by default */
                    labelIdle='Upload luggage <span class="filepond--label-action">Image</span>'
                  />
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
