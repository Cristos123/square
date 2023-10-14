"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
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
const token = globalThis.window?.localStorage.getItem("accessToken");
const getUserId =
  globalThis.window?.localStorage.getItem("organizer_user") || null;
export default function AddOrganizerModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [organizer, setOrganizer] = useState();
  const [banner_image_url, setBannerImageUrl] = useState(null);
  const [car_image, setCarImage] = useState(null);
  const [insurance_image, setInsuranceImage] = useState(null);

  const [proof_of_Ownership_image, setProofofOwnershipImage] = useState(null);

  const handleRichTextChange = (value, name) => {
    setOrganizer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleResponseProofofOwnershipImage = (response) => {
    handleRichTextChange(response?.secure_url, "proof_of_Ownership_image");
  };
  const handleResponsecar_image = (response) => {
    handleRichTextChange(response?.secure_url, "car_image");
  };

  const resetResponsepcar_image = () => {
    handleRichTextChange("", "car_image");
  };
  const resetResponseproofofOwnershipImage = () => {
    handleRichTextChange("", "proof_of_Ownership_image");
  };
  const handleResponseInsuranceImage = (response) => {
    handleRichTextChange(response?.secure_url, "insurance_image");
  };

  const resetResponseinsuranceImage = () => {
    handleRichTextChange("", "insurance_image");
  };
  const handleResponseRoadWorthinessImage = (response) => {
    handleRichTextChange(response?.secure_url, "banner_image_url");
  };

  const resetResponseRoadWorthinessImage = () => {
    handleRichTextChange("", "banner_image_url");
  };
  const revertProofofOwnershipImage = (
    token,
    successCallback,
    errorCallback
  ) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponseproofofOwnershipImage,
    });
  };
  const revertInsuranceImage = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponseinsuranceImage,
    });
  };
  const revertCarImage = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponsepcar_image,
    });
  };
  const processCarImage = async (
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
      responseCallback: handleResponsecar_image,
    });

    return {
      abort: () => {
        abortRequest.abort();
        abort();
      },
    };
  };
  const revertRoadWorthinessImage = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponseRoadWorthinessImage,
    });
  };

  const processProofofOwnershipImage = async (
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
      responseCallback: handleResponseProofofOwnershipImage,
    });

    return {
      abort: () => {
        abortRequest.abort();
        abort();
      },
    };
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
  const processInsuranceImage = async (
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
      responseCallback: handleResponseInsuranceImage,
    });

    return {
      abort: () => {
        abortRequest.abort();
        abort();
      },
    };
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

    const json = JSON.stringify(organizer);
    try {
      toast("Please wait...");
      console.log(json);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}organizer`,
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
        toast("Organizer created successfully");
        console.log(json);
        setTimeout(() => globalThis?.window.location.reload(), 2000);
        setLoading(false);
      } else {
        toast("Failed to add organizer");
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
    setOrganizer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ['organizer_user']: getUserId
    }));
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-4   justify-center overflow-y-auto"
      >
        <Box sx={style}>
          <div className=" flex justify-center items-center bg-white p-6 overflow-y-auto">
            <form
              className="w-full flex flex-col md:w-2/3 lg:w-1/2 mx-auto mb-24 sm:text-xs my-auto"
              onSubmit={handleSubmit}
            >
              <h4 className="text-center font-semibold py-5">
                Add a Organizer
              </h4>
              <div className="font-bold mt-4">
                Name<span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder="Name"
                name="name"
                value={organizer?.name}
                onChange={handleChange}
                required
              />
              <div className="font-bold mt-4">
                Email <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-md w-full focus:outline-none"
                  placeholder="ellu-p@gmail.com"
                  type={"email"}
                  name="email"
                  value={organizer?.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="font-bold mt-4">
                Phone <span className="text-red-500 my-auto">*</span>
              </div>
              <div className="flex w-full mb-4">
                <input
                  className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                  placeholder="0708955332"
                  type={"tel"}
                  maxLength={17}
                  minLength={11}
                  name="phone_1"
                  value={organizer?.phone_1}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                  placeholder="08065433235"
                  type={"tel"}
                  maxLength={17}
                  minLength={11}
                  name="phone_2"
                  value={organizer?.phone_2}
                  onChange={handleChange}
                  // required
                  disabled={loading}
                />
              </div>
              <textarea
                className="p-2 border bg-transparent w-full rounded-md border-gray-800 focus:outline-none resize-none"
                placeholder="Address"
                type={"text"}
                rows={2}
                name="address"
                value={organizer?.address}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                <div className="h-48 w-full bg-gray-200  mx-auto  mb-4">
                  <p className="py-4">Upload Banner </p>
                  <FilePond
                    // imagePreviewHeight={170}
                    // imageCropAspectRatio={"3:1"}
                    // imageResizeTargetWidth={600}
                    // imageResizeTargetHeight={200}
                    stylePanelLayout={"integrated"}
                    styleLoadIndicatorPosition={"center bottom"}
                    styleProgressIndicatorPosition={"right bottom"}
                    styleButtonRemoveItemPosition={"left bottom"}
                    styleButtonProcessItemPosition={"right bottom"}
                    // ref={profilePic}
                    files={banner_image_url}
                    acceptedFileTypes={["image/*"]}
                    onupdatefiles={setBannerImageUrl}
                    allowMultiple={false}
                    maxFiles={1}
                    server={{
                      process: processRoadWorthinessImage,
                      revert: revertRoadWorthinessImage,
                    }}
                    name="file" /* sets the file input name, it's filepond by default */
                    labelIdle=' <span class="filepond--label-action">Banner</span>'
                  />
                </div>{" "}
              </div>

              <div className="flex mt-10 mx-auto w-full">
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
                    Save
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
