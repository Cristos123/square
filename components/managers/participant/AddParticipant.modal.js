"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import Autocomplete from "@/components/inputs/autocomplete.input";
import { Card, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FilePond } from "react-filepond";

import Button from "@/components/buttons/GeneralButton";

const locationoptions = [
  { value: "", label: "Select Job location" },
  { value: "onsite", label: "Onsite" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];
const gender = [
  { value: "", label: "Select gender" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
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
const accessToken = globalThis.window?.localStorage.getItem("accessToken");
const getUserId =
  globalThis.window?.localStorage.getItem("organizer_user") || null;
export default function AddParticipantModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [participant, setParticipant] = useState({});
  const [event_image_url, setEventImageUrl] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    delete participant.undefined;

    const json = JSON.stringify(participant);
    try {
      toast("Please wait...");
      console.log(json);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}participant`,
        json,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
  const handleRichTextChange = (value, name) => {
    setParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResponseRoadWorthinessImage = (response) => {
    handleRichTextChange(response?.secure_url, "event_image_url");
  };

  const resetResponseRoadWorthinessImage = () => {
    handleRichTextChange("", "event_image_url");
  };

  const revertRoadWorthinessImage = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponseRoadWorthinessImage,
    });
  };
  const processRoadWorthinessImage = async (
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
      responseCallback: handleResponseRoadWorthinessImage,
    });

    return {
      abort: () => {
        abortRequest.abort();
        abort();
      },
    };
  };

  const handleChange = (e) => {
    setParticipant((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ["organizer_user"]: getUserId,
      ["programme"]: props?.programeId,
    }));
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-4    overflow-y-auto"
      >
        <Box sx={style}>
          <div className=" flex flex-col justify-center items-center bg-white p-6 overflow-y-auto">
            <form
              className="w-full flex flex-col md:w-2/3 lg:w-1/2 mx-auto mb-24 sm:text-xs my-auto"
              onSubmit={handleSubmit}
            >
              <h2 className="font-semibold py-5 text-center ">
                Create A Participant
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                <div className="h-48 w-full bg-gray-200  mx-auto  mb-4">
                  <p className="py-4">Upload Event Banner </p>
                  <FilePond
                    imagePreviewHeight={170}
                    // imageCropAspectRatio={"3:1"}
                    // imageResizeTargetWidth={600}
                    // imageResizeTargetHeight={200}
                    stylePanelLayout={"integrated"}
                    styleLoadIndicatorPosition={"center bottom"}
                    styleProgressIndicatorPosition={"right bottom"}
                    styleButtonRemoveItemPosition={"left bottom"}
                    styleButtonProcessItemPosition={"right bottom"}
                    // ref={profilePic}
                    files={event_image_url}
                    acceptedFileTypes={["image/*"]}
                    onupdatefiles={setEventImageUrl}
                    allowMultiple={false}
                    maxFiles={1}
                    server={{
                      process: processRoadWorthinessImage,
                      revert: revertRoadWorthinessImage,
                    }}
                    name="file" /* sets the file input name, it's filepond by default */
                    labelIdle=' <span class="filepond--label-action"> Event Banner</span>'
                  />
                </div>{" "}
              </div>
              <div className="font-bold mt-4">
                First Name<span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder="First name"
                name="first_name"
                onChange={handleChange}
                required
                disabled={loading}
                value={participant?.first_name}
              />{" "}
              <div className="font-bold mt-4">
                Middle Name<span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder="middle name"
                name="middle_name"
                onChange={handleChange}
                // required
                disabled={loading}
                value={participant?.middle_name}
              />{" "}
              <div className="font-bold mt-4">
                Last Name<span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder=" last name"
                name="last_name"
                onChange={handleChange}
                required
                disabled={loading}
                value={participant?.last_name}
              />{" "}
              <div className="font-bold mt-4">
                Email<span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder=" Email"
                name="email"
                onChange={handleChange}
                required
                disabled={loading}
                value={participant?.email}
              />{" "}
              <div className="font-bold mt-2">
                Phone <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex my-3 w-full">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="+234708955332"
                  type={"tel"}
                  maxLength={17}
                  minlength={11}
                  name="phone_number"
                  value={participant?.phone_number}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="08065433235"
                  type={"tel"}
                  maxLength={17}
                  minlength={11}
                  name="phone_number2"
                  value={participant?.phone_number2}
                  onChange={handleChange}
                  //   required
                  disabled={loading}
                />{" "}
              </div>
              <div className="font-bold mt-2">
                DOB <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full mb-4">
                <input
                  name="dob"
                  type="date"
                  onChange={handleChange}
                  required
                  disabled={loading}
                  value={participant?.dob}
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                />

                <select
                  name="gender"
                  onChange={handleChange}
                  required
                  disabled={loading}
                  value={participant?.gender}
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                >
                  <option value="" className="p-2">
                    Gender
                  </option>
                  {gender.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="font-bold mt-4">
                Address<span className="text-red-500 my-auto">*</span>
              </div>
              <textarea
                className="p-2 border resize-none bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder=" address"
                name="address"
                onChange={handleChange}
                required
                disabled={loading}
                value={participant?.address}
              />{" "}
              <div className="font-bold mt-4">
                Place<span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border resize-none bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder=" address"
                name="place"
                onChange={handleChange}
                required
                disabled={loading}
                value={participant?.place}
              />{" "}
              <div className="font-bold mt-2">
                KYC <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex my-3 w-full">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="BVN"
                  type={"text"}
                  name="bvn"
                  value={participant?.bvn}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="NIN"
                  type={"text"}
                  name="nin"
                  value={participant?.nin}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />{" "}
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
                    Submit
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
