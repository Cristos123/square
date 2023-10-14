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
import ImageUpload from "@/components/upload/FileUpload";

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
export default function AddRoutineModal(props) {
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
        <div className=" flex flex-col justify-center items-center bg-white p-6 overflow-y-auto">
          <h2 className="font-semibold py-5 text-center ">Add Routine</h2>

          <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-center font-semibold py-5">Routine</h5>
            <div className="grid grid-cols-1 md:grid-cols-2  md:gap-10">
              <InputSelect
                type="time"
                name="From"
                label="From"
                placeholder="Enter start time"
                control={control}
                rules={{ required: "Please specify your time started" }}
                errors={errors?.from?.message}
              />{" "}
              <InputSelect
                type="time"
                name="end"
                label="to"
                placeholder="To"
                control={control}
                rules={{
                  required: "Please enter end time to finish the task ",
                }}
                errors={errors.selectField}
              />
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2  md:gap-10">
              <InputSelect
                type="select"
                name="prove_required"
                options={proveRequired}
                label="Prove Required"
                placeholder="Pleae select prove required"
                control={control}
                rules={{ required: "Please specify your time started" }}
                errors={errors?.prove_required?.message}
              />{" "}
              <InputSelect
                type="select"
                name="update_status"
                label="Update Status"
                options={updateStatus}
                placeholder="Update Status"
                control={control}
                rules={{
                  required: "Please select Update Status ",
                }}
                errors={errors.selectField}
              />
            </div>
            <div className="flex  flex-col items-center py-6 justify-center">
              <p className="">Prove Photo</p>
              <ImageUpload onChange={handleImageChange} />
            </div>
            <RichTextEditor
              name="task"
              label="Task"
              control={control}
              rules={{ required: "This field is required" }}
              options={editorOptions}
            />
            <h5 className="text-center font-semibold py-5">Performance</h5>{" "}
            <InputSelect
              type="select"
              name="performance_update_status"
              label="Update Status"
              options={PerformanceUpdateStatus}
              placeholder="Performance Update Status"
              control={control}
              rules={{
                required: "Please select Update Status ",
              }}
              errors={errors.selectField}
            />
            <div className="flex  flex-col items-center py-6 justify-center">
              <p className="">Prove Photo</p>
              <ImageUpload onChange={handleImageChange} />
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
