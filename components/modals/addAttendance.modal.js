"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import Autocomplete from "@/components/inputs/autocomplete.input";

import InputSelect from "@/components/inputsComponent/InputSelect";
import GeneralModal from "@/components/modals/GeneralModal";
import Modals from "@/components/modals/StoreModal";
import RichTextEditor from "@/components/richtext/RichTextEditor";
import RichText from "@/components/richtext/RichTextEditor";
import { Card, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ReplayIcon from "@mui/icons-material/Replay";
import Webcam from "react-webcam";

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

  p: 4,
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
const token = globalThis.window?.localStorage.getItem("token");
export default function AddAttendanceModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState({});
  const [imgSrc, setImgSrc] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const webcamRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

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

  const handleSubmitLiveness = async (e) => {
    setLoading(true);
    e.preventDefault();

    const json = JSON.stringify({ image: imgSrc });
    const queryString = new URLSearchParams(JSON.parse(json)).toString();
    const dojah_key = process.env.NEXT_PUBLIC_DOJAH_KEY;
    const dojah_app_id = process.env.NEXT_PUBLIC_DOJAH_APPID;
    try {
      toast("Please wait...");
      const response = await axios.post(
        `https://sandbox.dojah.io/api/v1/ml/liveness/`,
        json,
        {
          headers: {
            Authorization: dojah_key,
            APPId: dojah_app_id,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        toast("Successful");
        handleNext();
        setLoading(false);
      } else {
        toast("Failed");
        setLoading(false);
      }
    } catch (e) {
      toast("Something went wrong");
      setLoading(false);
      console.log(e);
    }
  };
  //   const handleSubmit = async (e) => {

  //     setLoading(true);
  //     e.preventDefault();

  //     const json = JSON.stringify(branch);
  //     try {
  //       toast("Please wait...");
  //       console.log(json);

  //       const response = await axios.post(
  //         `https://audstacknga.herokuapp.com/api/v1/store/branch`,
  //         json,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(response);
  //       if (response.status == 200) {
  //         toast("Branch created successfully");
  //         setTimeout(() => globalThis?.window.location.reload(), 2000);
  //         setLoading(false);

  //       } else {
  //         toast("Failed to add branch");
  //         setLoading(false);
  //       }
  //     } catch (e) {
  //       toast("Something went wrong");
  //       setLoading(false);
  //       console.log(e);
  //     }
  //   };

  const handleChange = (e) => {
    setBranch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ["store_id"]: props.storeId,
    }));
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-4  lg:mx-20  overflow-y-auto"
      >
        <div className=" flex justify-center items-center bg-white p-6 overflow-y-auto">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-center pt-3"> Clock In</h4>
            <>
              {" "}
              <InputSelect
                type="text"
                name="time"
                label="Time"
                placeholder="time"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              <div>
                {accepted ? (
                  <form onSubmit={handleSubmitLiveness}>
                    {imgSrc ? (
                      <div className="relative">
                        <img src={imgSrc} />
                        <div
                          className="text-green-500 absolute bottom-4 right-4  w-fit h-fit opacity-50 cursor-pointer"
                          onClick={() => setImgSrc(null)}
                        >
                          <ReplayIcon fontSize="large" />
                        </div>
                      </div>
                    ) : (
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                      />
                    )}
                    <div
                      onClick={capture}
                      className="bg-black text-white px-4 py-2 text-center my-4  rounded-md cursor-pointer"
                    >
                      Capture
                    </div>
                  </form>
                ) : (
                  <div className="w-full flex flex-col my-8 p-4">
                    <div className="mx-auto text-gray-500 h-fit w-fit">
                      <PhotoCameraIcon fontSize="large" />
                    </div>
                    <div className="text-center">
                      Ensure you are in a well lit enviroment.
                    </div>
                    <div
                      onClick={() => setAccepted(true)}
                      className="bg-black text-white px-4 py-2 text-center my-4 w-full  rounded-md cursor-pointer"
                    >
                      Continue
                    </div>
                  </div>
                )}
              </div>
            </>{" "}
            <h4 className="text-center pt-3"> Clock Out</h4>
            <>
              {" "}
              <InputSelect
                type="text"
                name="time"
                label="Time"
                placeholder="time"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              <div>
                {accepted ? (
                  <form onSubmit={handleSubmitLiveness}>
                    {imgSrc ? (
                      <div className="relative">
                        <img src={imgSrc} />
                        <div
                          className="text-green-500 absolute bottom-4 right-4  w-fit h-fit opacity-50 cursor-pointer"
                          onClick={() => setImgSrc(null)}
                        >
                          <ReplayIcon fontSize="large" />
                        </div>
                      </div>
                    ) : (
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                      />
                    )}
                    <div
                      onClick={capture}
                      className="bg-black text-white px-4 py-2 text-center my-4  rounded-md cursor-pointer"
                    >
                      Capture
                    </div>
                  </form>
                ) : (
                  <div className="w-full flex flex-col my-8 p-4">
                    <div className="mx-auto text-gray-500 h-fit w-fit">
                      <PhotoCameraIcon fontSize="large" />
                    </div>
                    <div className="text-center">
                      Ensure you are in a well lit enviroment.
                    </div>
                    <div
                      onClick={() => setAccepted(true)}
                      className="bg-black text-white px-4 py-2 text-center my-4 w-full  rounded-md cursor-pointer"
                    >
                      Continue
                    </div>
                  </div>
                )}
              </div>
            </>
            <h4 className="text-center pt-3"> report</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full  md:gap-10">
              <InputSelect
                type="textarea"
                name="damages"
                row={10}
                label="Damages"
                placeholder="Damages"
                control={control}
                rules={{ required: "Please provide your Damages" }}
                errors={errors?.reward?.message}
              />
              {"  "}{" "}
              <InputSelect
                type="textarea"
                name="needs"
                label="Needs"
                placeholder="needs"
                row={10}
                control={control}
                rules={{ required: "Please provide your Needs" }}
                errors={errors?.nin?.message}
              />
              {"  "}
            </div>
            <InputSelect
              type="textarea"
              name="coworker"
              label="Coworker"
              placeholder="Coworker"
              row={10}
              control={control}
              rules={{ required: "Please provide your coworker" }}
              errors={errors?.coworker?.message}
            />
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
      </Modal>
    </div>
  );
}
