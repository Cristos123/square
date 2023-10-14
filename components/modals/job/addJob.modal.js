"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import Autocomplete from "@/components/inputs/autocomplete.input";

import InputSelect from "@/components/inputsComponent/InputSelect";
import GeneralModal from "@/components/modals/GeneralModal";
import Modals from "@/components/modals/StoreModal";
import RichTextEditor from "@/components/richtext/RichTextEditor";
import RichText from "@/components/richtext/RichTextEditor";
import { Card, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

import Button from "@/components/buttons/GeneralButton";

const locationoptions = [
  { value: "", label: "Select Job location" },
  { value: "onsite", label: "Onsite" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];
const jobType = [
  { value: "", label: "Select job Type" },
  { value: "fullTime", label: "Full-time" },
  { value: "partTime", label: "PartTime" },
  { value: "contract", label: "contract" },
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
export default function AddJobModal(props) {
  const [addressData, setAddressData] = useState([]);
  const [place, setPlace] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState({});

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
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="p-4 mx-20  overflow-y-auto"
      >
        <div className=" flex justify-center items-center bg-white p-6 overflow-y-auto">
          <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2  md:gap-10">
              <InputSelect
                type="text"
                name="title"
                label="Title"
                placeholder="Enter Title"
                control={control}
                rules={{ required: "Please enter job title" }}
                errors={errors?.title}
              />{" "}
              <InputSelect
                type="text"
                name="department"
                label="Department"
                placeholder="Enter Department"
                control={control}
                rules={{ required: "Please enter your job department" }}
                errors={errors.department}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <InputSelect
                type="select"
                name="jobType"
                label="Job Type"
                options={jobType}
                placeholder="Select an option"
                control={control}
                rules={{ required: "Please select an option" }}
                errors={errors.jobType}
              />{" "}
              <InputSelect
                type="select"
                name="location"
                label="Job Location"
                options={locationoptions}
                placeholder="Select an option"
                control={control}
                rules={{ required: "Please select an option" }}
                errors={errors.location}
              />{" "}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <RichTextEditor
                name="brief"
                label="Brief Job Description"
                control={control}
                rules={{ required: "This field is required" }}
                options={editorOptions}
              />
              <RichTextEditor
                name="benefits"
                label="Job Benefits"
                control={control}
                rules={{ required: "This field is required" }}
                options={editorOptions}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <RichTextEditor
                name="jb"
                label="Job Description"
                control={control}
                rules={{ required: "This field is required" }}
                options={editorOptions}
              />
              <RichTextEditor
                name="requirement"
                label="Job Requirement"
                control={control}
                rules={{ required: "This field is required" }}
                options={editorOptions}
              />
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
      </Modal>
    </div>
  );
}
