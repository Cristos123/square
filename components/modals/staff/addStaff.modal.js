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
export default function AddStaffModal(props) {
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
        className="p-4  lg:mx-20  overflow-y-auto"
      >
        <div className=" flex justify-center items-center bg-white p-6 overflow-y-auto">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3   md:gap-10">
              <InputSelect
                type="text"
                name="firstName"
                label="Firstname"
                placeholder="Enter Firstname"
                control={control}
                rules={{ required: "Please firstname is required" }}
                errors={errors?.firstName?.message}
              />

              <InputSelect
                type="text"
                name="middle_name"
                label="Middle Name"
                placeholder="Enter Middle name"
                control={control}
                rules={{ required: "Please middle name is required" }}
                errors={errors?.middle_name?.message}
              />

              <InputSelect
                type="text"
                name="last_name"
                label="Lastname"
                placeholder="Enter Lastname"
                control={control}
                rules={{ required: "Please lastname is required" }}
                errors={errors?.last_name?.message}
              />
            </div>
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
                name="receiver_phone_1"
                // value={delivery?.receiver_phone_1}
                // onChange={handleDeliveryChange}
                {...register("phone_number", {
                  required: "Please provide phone number with country code",
                })}
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
                {...register("phone_number2", {
                  required: "Please provide phone number with country code",
                })}
                // value={delivery?.receiver_phone_2}
                // onChange={handleDeliveryChange}
                required
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <InputSelect
                type="select"
                name="gender"
                label="Gender"
                options={gender}
                placeholder="Select an option"
                control={control}
                rules={{ required: "Please select an option" }}
                errors={errors?.gender?.message}
              />{" "}
              <InputSelect
                type="text"
                name="dob"
                label="Date of Birth"
                placeholder="02-02-2023"
                control={control}
                rules={{ required: "Please select an option" }}
                errors={errors?.dob?.message}
              />{" "}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <InputSelect
                type="text"
                name="email"
                label="Email"
                placeholder="seun@example.com"
                control={control}
                rules={{ required: "Please enter your email" }}
                errors={errors?.email?.message}
              />{" "}
              <InputSelect
                type="textarea"
                name="address"
                label="Address"
                placeholder="c20 ile-ife"
                row={2}
                control={control}
                rules={{ required: "Please provide your address" }}
                errors={errors?.address?.message}
              />{" "}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
              <InputSelect
                type="text"
                name="place"
                label="Place"
                placeholder="Mayfair"
                control={control}
                rules={{ required: "Please enter your Place" }}
                errors={errors?.place?.message}
              />
              {"  "}
              <InputSelect
                type="text"
                name="bvn"
                label="KYC"
                placeholder="BVN"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.bvn?.message}
              />
              {"  "}{" "}
              <InputSelect
                type="text"
                name="nin"
                label="NIN"
                placeholder="NIN"
                control={control}
                rules={{ required: "Please provide your NIN" }}
                errors={errors?.nin?.message}
              />
              {"  "}
            </div>
            <h4 className="text-center pt-3"> Start of Bussiness</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 md:gap-10">
              <InputSelect
                type="text"
                name="time"
                label="Time Started"
                placeholder="time"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              {"  "}
              <InputSelect
                type="text"
                name="reward"
                label="Reward"
                placeholder="BVN"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.reward?.message}
              />
              {"  "}{" "}
              <InputSelect
                type="text"
                name="deduction"
                label="deduction"
                placeholder="deduction"
                control={control}
                rules={{ required: "Please provide your NIN" }}
                errors={errors?.nin?.message}
              />
              {"  "}
            </div>
            <h4 className="text-center pt-3"> Break</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full  md:gap-10">
              <InputSelect
                type="text"
                name="time_started"
                label="Time Started"
                placeholder="time"
                control={control}
                className="md:px-3"
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />{" "}
              <InputSelect
                type="text"
                name="time_end"
                label="Time End"
                placeholder="time end"
                control={control}
                rules={{ required: "Please enter your time ends" }}
                errors={errors?.place?.message}
              />
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full  md:gap-10">
              <InputSelect
                type="text"
                name="reward"
                label="Reward"
                placeholder="BVN"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.reward?.message}
              />
              {"  "}{" "}
              <InputSelect
                type="text"
                name="deduction"
                label="deduction"
                placeholder="deduction"
                control={control}
                rules={{ required: "Please provide your NIN" }}
                errors={errors?.nin?.message}
              />
              {"  "}
            </div>
            <h4 className="text-center pt-3"> COB</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 md:gap-10">
              <InputSelect
                type="text"
                name="cob_time"
                label="Time Started"
                placeholder="time"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              {"  "}
              <InputSelect
                type="text"
                name="cob_reward"
                label="Reward"
                placeholder="BVN"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.reward?.message}
              />
              {"  "}{" "}
              <InputSelect
                type="text"
                name="cob_deduction"
                label="deduction"
                placeholder="deduction"
                control={control}
                rules={{ required: "Please provide your NIN" }}
                errors={errors?.nin?.message}
              />
            </div>{" "}
            {"  "}
            <h4 className="text-center font-semibold text-md pt-3">
              {" "}
              Renumeration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:gap-10">
              <InputSelect
                type="text"
                name="basic_salary"
                label="Basic Salary"
                placeholder="10000"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              {"  "}
              <InputSelect
                type="text"
                name="hmo"
                label="HMO"
                placeholder="HmO"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.reward?.message}
              />
              {"  "}{" "}
            </div>{" "}
            {"  "}
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:gap-10">
              <InputSelect
                type="text"
                name="airtime"
                label="Airtime"
                placeholder="10000"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              {"  "}
              <InputSelect
                type="text"
                name="data"
                label="Data"
                placeholder="data"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.reward?.message}
              />
              {"  "}{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:gap-10">
              <InputSelect
                type="text"
                name="tax"
                label="Tax"
                placeholder="10000"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              {"  "}
              <InputSelect
                type="text"
                name="caution"
                label="Caution"
                placeholder="caution"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.reward?.message}
              />
              {"  "}{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:gap-10">
              <InputSelect
                type="text"
                name="pension"
                label="pension"
                placeholder="10000"
                control={control}
                rules={{ required: "Please enter your time started" }}
                errors={errors?.place?.message}
              />
              {"  "}
              <InputSelect
                type="text"
                name="agency"
                label="agency"
                placeholder="agency"
                control={control}
                rules={{ required: "Please provide your BVN" }}
                errors={errors?.reward?.message}
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
