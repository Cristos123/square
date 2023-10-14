'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import axios from "axios";
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react";

import Autocomplete from "@/components/inputs/autocomplete.input";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    height: "100%",
    bgcolor: 'background.paper',
    // border: '2px solid #000',

    p: 4,

};
const accessToken = globalThis.window?.localStorage.getItem("accessToken");
export default function EditBranchModal(props) {
    const [branch,setBranch]= useState()
    const [loading, setLoading] = useState(false);
    const [addressData, setAddressData] = useState([]);
    const [place, setPlace] = useState("");
    const [otherAddress, setOtherAddress] = useState("");
    const handleClick = (obj) => {
      // 👇️ take the parameter passed from the Child component
      setAddressData((emp) => ({ ...emp, ...obj }));
      setPlace(obj[1]?.replaceAll(",", ""));
      setOtherAddress(
        obj?.slice(2)?.join("/").replaceAll("/", "").replaceAll(",", ", ") || ""
      );
  
      console.log("argument from Child: ", obj);
    };
    useEffect(() => {
      if (branch == null) {
        setBranch(props.data);
      }
      if (props.open == false) {
        setBranch(props.data);
      }
    }, [branch, props.open]);

    const handleChange = (e) => {
      setBranch((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };


    
  const handleSubmit = async (e) => {
    // update sore id
    setBranch((prev) => ({
      ...prev,
      ["store_id"]: props.storeId,
    }));
    setLoading(true);
    e.preventDefault();
    const id = branch?.id
    const body=branch;
    delete (body.id)
    delete (body.branch_owner)
    delete (body.reg_no)
    const json = JSON.stringify(branch);
    try {
      toast("Please wait...");
      console.log(json);
      const response = await axios.put(
        `https://api.instadrop.com.ng/api/store-branch/${id}`,
        json,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        toast("Branch updated successfully");
        setTimeout(() => globalThis?.window.location.reload(), 2000);
        
      } else {
        toast("Failed to update branch");
        setLoading(false);
      }
    } catch (e) {
      toast("Something went wrong");
      setLoading(false);
      console.log(e);
    }
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
            <div className="mb-4 w-fit  mx-auto">Edit this branch</div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:w-1/2 mx-auto mb-24 sm:text-xs my-auto"
            >
              <div className="font-bold mt-4">
                Name<span className="text-red-500 my-auto">*</span>
              </div>
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
                placeholder="Name"
                name="name"
                value={branch?.name}
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
                  value={branch?.email}
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
                  value={branch?.phone_1}
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
                  value={branch?.phone_2}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <textarea
                className="p-2 border bg-transparent w-full rounded-md border-gray-800 focus:outline-none resize-none"
                placeholder="Address"
                type={"text"}
                rows={2}
                name="address"
                value={branch?.address}
                onChange={handleChange}
                required
                disabled={loading}
              />
              {/* <Autocomplete
                placeholder={"Address"}
                url="https://audstacknga.herokuapp.com/api/v1/location/address"
                onPassData={handleClick}
                disabled={loading}
              />
              <input
                className="p-2 border bg-transparent border-b-0 border-gray-800 focus:outline-none"
                placeholder="Place/Estate/Hostel/Neighbourhood/Commuinity"
                value={place}
                disabled={loading}
              />
              <input
                className="p-2 border bg-transparent border-gray-800 rounded-b-md focus:outline-none"
                placeholder="Ward/LGA/State"
                value={otherAddress}
                disabled={loading}
              /> */}

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
          </Box>
        </Modal>
      </div>
    );
}