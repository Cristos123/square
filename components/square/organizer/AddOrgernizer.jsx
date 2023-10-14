"use client";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import Autocomplete from "@/components/inputs/autocomplete.input";

import InputSelect from "@/components/inputsComponent/InputSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
const token = globalThis.window?.localStorage.getItem("token");

const salutation = [
  {
    value: "mr",
    label: "Mr",
    id: 1,
  },
  {
    value: "mrs",
    label: "Mrs",
    id: 2,
  },
  {
    value: "dr",
    label: "Dr",
    id: 3,
  },
];
export default function ContactProfile(props) {
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
    <div className=" flex flex-col justify-center items-center bg-white mt-10 p-6 overflow-y-auto">
      <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
        {/* <h5 className="text-center font-semibold py-5">Routine</h5> */}
        <InputSelect
          type="select"
          name="salutation"
          label="Salutation"
          options={salutation}
          placeholder="salutation"
          control={control}
          rules={{ required: "Please " }}
          errors={errors?.salutation}
        />{" "}
        <InputSelect
          type="text"
          name="name"
          label="Name"
          row={2}
          placeholder="Enter Name"
          control={control}
          rules={{ required: "Please " }}
          errors={errors?.name}
        />{" "}
        <InputSelect
          type="select"
          name="funnel"
          label="Funnel"
          options={salutation}
          placeholder="Funnel"
          control={control}
          rules={{ required: "Please " }}
          errors={errors?.salutation}
        />{" "}
        <InputSelect
          type="text"
          name="email"
          label="Email"
          row={2}
          placeholder="Enter Email"
          control={control}
          rules={{ required: "Please specify your email" }}
          errors={errors?.email}
        />{" "}
        <InputSelect
          type="text"
          name="company"
          label="Company"
          row={2}
          placeholder="Enter Company"
          control={control}
          rules={{ required: "Please specify your Company" }}
          errors={errors?.company}
        />{" "}
        {/* <div className=" flex flex-col">
          <p>Genger</p>
          <div className="flex md:flex-row flex-col justify-between items-center space-y-4">
            
          </div>
        </div> */}
        <div className="flex flex-col my-4">
          <h1 className="text-lg font-semibold mb-2"> Gender</h1>
          <div className="flex  justify-between  space-x-2">
            <label className="flex  ">
              <input
                type="radio"
                name="gender"
                value="female"
                // checked={selectedGender === "female"}
                // onChange={handleGenderChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex  ">
              <input
                type="radio"
                name="gender"
                value="male"
                // checked={selectedGender === "male"}
                // onChange={handleGenderChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex  ">
              <input
                type="radio"
                name="gender"
                value="others"
                // checked={selectedGender === "others"}
                // onChange={handleGenderChange}
                className="mr-2"
              />
              Others
            </label>
          </div>
        </div>
        <InputSelect
          type="text"
          name="city"
          label="City"
          placeholder="Enter City"
          control={control}
          rules={{ required: "Please specify your title" }}
          errors={errors?.notes}
        />{" "}
        <InputSelect
          type="textarea"
          name="address"
          label="Address"
          row={3}
          placeholder="Enter Address"
          control={control}
          rules={{ required: "Please specify your Address" }}
          errors={errors?.address}
        />{" "}
        <InputSelect
          type="textarea"
          name="notes"
          label="Notes"
          row={3}
          placeholder="Enter Notes"
          control={control}
          rules={{ required: "Please specify your notes" }}
          errors={errors?.notes}
        />{" "}
        <div className="flex mx-auto w-full">
          <div className="mx-auto w-full grid grid-cols-1 gap-x-2">
            <div className="flex">
              <button
                className="p-2 bg-red-50 w-[100px] text-red-600 mt-4  mr-3 rounded-md"
                disabled={loading}
                type={"butto"}
              >
                <DeleteIcon />
              </button>{" "}
              <button
                className="p-2 bg-black w-full text-white mt-4 rounded-md"
                disabled={loading}
                type={"submit"}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
