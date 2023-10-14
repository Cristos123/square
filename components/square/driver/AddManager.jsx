import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FilePond } from "react-filepond";
import {
  makeDeleteRequest,
  makeUploadRequest,
} from "@/cloudinary/cloudinaryHelper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  overflow: "scroll",
  // border: '2px solid #000',

  p: 4,
};
const accessToken = globalThis.window?.localStorage.getItem("accessToken");
export default function AddManagerModal(props) {
  const [manager, setManager] = useState({});
  const [loading, setLoading] = useState(false);
  const [passport_url, setPassportUrl] = useState(null);

  const getUserId =
    globalThis.window?.localStorage.getItem("organizer_user") || null;
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const json = JSON.stringify(manager);
    try {
      toast("Please wait...");
      console.log(json);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}manager`,
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
        setTimeout(() => globalThis?.window.location.reload(), 2000);
      } else {
        toast("Failed");
        setLoading(false);
      }
    } catch (e) {
      toast(e?.response?.data?.message || e?.message);
      setLoading(false);
      console.log(e);
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "phone_1" || e.target.name == "phone_2") {
      if (e.target.value?.trim().startsWith("0")) {
        setManager((prev) => ({
          ...prev,
          [e.target.name]: "+234" + e.target.value.trim()?.substring(1),
          organizer_user: getUserId,
        }));
      } else {
        setManager((prev) => ({
          ...prev,
          [e.target.name]: e.target.value?.trim(),
          organizer_user: getUserId,
        }));
      }
    } else {
      setManager((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        organizer_user: getUserId,
      }));
    }
  };

  const handleRichTextChange = (value, name) => {
    setManager((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleResponse = (response) => {
    handleRichTextChange(response?.secure_url, "passport_url");
  };

  const resetResponse = () => {
    handleRichTextChange("", "passport_url");
  };

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      responseCallback: resetResponse,
    });
  };

  const processImage = async (
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

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* name
       image
       phone1
       phone2
       email
       type */}
          {/* INPUTS */}
          <div className="mb-4 w-fit  mx-auto">Add a Manager</div>
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
                server={{ process: processImage, revert }}
                name="file" /* sets the file input name, it's filepond by default */
                labelIdle='New <span class="filepond--label-action">Portrait</span>'
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto"
          >
            <div className="font-bold mt-4">
              Names <span className="text-red-500 my-auto">*</span>
            </div>
            <div className="flex w-full">
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                placeholder="Driver first name"
                type={"text"}
                value={manager?.manager_first_name}
                onChange={handleChange}
                required
                name="manager_first_name"
                disabled={loading}
              />
              <input
                className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs"
                placeholder="Driver last name"
                type={"text"}
                value={manager?.manager_last_name}
                onChange={handleChange}
                required
                name="manager_last_name"
                disabled={loading}
              />
            </div>{" "}
            <div className="font-bold mt-4">
              Email <span className="text-red-500 my-auto">*</span>
            </div>
            <div className="flex w-full">
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                placeholder="ellu-p@gmail.com"
                type={"email"}
                value={manager?.email}
                onChange={handleChange}
                required
                name="email"
                disabled={loading}
              />
              <select
                value={manager?.gender}
                onChange={handleChange}
                required
                disabled={loading}
                name="gender"
                className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs"
              >
                <option value="" className="p-2">
                  Select gender
                </option>
                <option value="Male" className="p-2">
                  Male
                </option>
                <option value="Female" className="p-2">
                  Female
                </option>
              </select>
            </div>
            <div className="font-bold mt-4">
              KYC <span className="text-red-500 my-auto">*</span>
            </div>
            <div className="flex w-full">
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                placeholder="NIN"
                type={"text"}
                value={manager?.nin}
                onChange={handleChange}
                required
                name="nin"
                disabled={loading}
              />
              <input
                className="p-2 bg-transparent border border-l-0 border-gray-800 rounded-r-md w-1/2 focus:outline-none text-xs"
                placeholder="BVN"
                type={"text"}
                value={manager?.bvn}
                onChange={handleChange}
                required
                name="bvn"
                disabled={loading}
              />
            </div>
            <div className="font-bold mt-4">
              Phone <span className="text-red-500 my-auto">*</span>
            </div>
            <div className="flex w-full">
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                placeholder="0708955332"
                type={"tel"}
                maxLength={17}
                minLength={11}
                disabled={loading}
                value={manager?.phone_1}
                onChange={handleChange}
                required
                name="phone_1"
              />
              <input
                className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                placeholder="08065433235"
                type={"tel"}
                maxLength={17}
                minLength={11}
                disabled={loading}
                value={manager?.phone_2}
                onChange={handleChange}
                name="phone_2"
              />
            </div>
            <div className="font-bold mt-4">
              Bank <span className="text-red-500 my-auto">*</span>
            </div>
            <div className="flex w-full">
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-l-md w-1/2 focus:outline-none"
                placeholder="Bank account Number"
                type={"number"}
                maxLength={10}
                minLength={10}
                disabled={loading}
                value={manager?.bank_account_number}
                onChange={handleChange}
                name="bank_account_number"
              />
              <input
                className="p-2 border bg-transparent border-l-0 w-1/2 rounded-r-md border-gray-800 focus:outline-none"
                placeholder="Bank name"
                type={"text"}
                minLength={1}
                disabled={loading}
                value={manager?.bank_name}
                onChange={handleChange}
                required
                name="bank_name"
              />
            </div>
            <div className="font-bold mt-4">
              Beneficiary<span className="text-red-500 my-auto">*</span>
            </div>
            <div className="flex w-full">
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md w-full focus:outline-none"
                placeholder="Bank beneficiary"
                type={"text"}
                disabled={loading}
                value={manager?.bank_account_name}
                onChange={handleChange}
                name="bank_account_name"
              />
            </div>
            <div className="font-bold mt-4">
              Address <span className="text-red-500 my-auto">*</span>
            </div>
            <textarea
              className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
              placeholder="Dispatcher address"
              value={manager?.address}
              onChange={handleChange}
              name="address"
            />
            <div className="flex mx-auto w-full">
              <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
                <button
                  type="button"
                  onClick={props.onClose}
                  disabled={loading}
                  className="p-2 bg-white border border-black text-black w-full  mt-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="p-2 bg-black w-full text-white mt-4 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
