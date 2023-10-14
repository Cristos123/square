"use client";

import { Switch } from "@mui/material";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Notification = () => {
  return (
    <div className=" flex flex-col  bg-white p-6 overflow-y-auto">
      <div className="flex flex-col w-2/4 bg-yellow-100  py-6 px-3">
        <p className="text-orange-400 py-2 font-semibold ">
          Your Credit Balance is low - 0₦ not found
        </p>
        <p className="text-sm text-orange-400 font-extralight">
          To effectively use this feature make sure you have enough credit
          avaliable. not found
        </p>

        <div className="flex mx-auto w-full">
          <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
            <button
              className="p-2 bg-white w-full text-black mt-4 rounded-md"
              type={"submit"}
            >
              Buy Now
            </button>{" "}
            <button
              className="p-2 bg-black w-full text-white mt-4 rounded-md"
              type={"submit"}
            >
              Know more
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col   py-6 px-3">
        <p className="text-black py-2 font-semibold ">Feature / Activity</p>
        <p className="text-sm text-gray-400 font-extralight">
          Configure notifications sent to your customers based on the activity.
          You will need credits in your account to trigfer the notifications.
        </p>
      </div>
      <hr></hr>
      <div className="flex justify-between items-center  py-3">
        <p className="font-semibold px-3 text-md"></p>{" "}
        <div className="flex items-end justify-end">
          <p className="font-semibold px-3 text-md">
            <WhatsAppIcon className="text-green-500 w-20 h-20" />
          </p>
          <p className="font-semibold px-3 text-md">
            <MailOutlineIcon className="text-red-500 w-20 h-20" />
          </p>
        </div>
      </div>{" "}
      <div className=" flex flex-col divide-y">
        <div className="flex items-center  justify-between  py-1">
          <p className="font-light text-md">Order Cancelled</p>
          <div className="flex items-end justify-end">
            <p>
              <Switch />
            </p>{" "}
            <p>
              <Switch />
            </p>
          </div>
        </div>{" "}
        <div className="flex items-center  justify-between  py-1">
          <p className="font-light text-md">Order Created</p>
          <div className="flex items-end justify-end">
            <p>
              <Switch />
            </p>{" "}
            <p>
              <Switch />
            </p>
          </div>
        </div>{" "}
        <div className="flex items-center  justify-between  py-1">
          <p className="font-light text-md">Order Processing</p>
          <div className="flex items-end justify-end">
            <p>
              <Switch />
            </p>{" "}
            <p>
              <Switch />
            </p>
          </div>
        </div>{" "}
        <div className="flex items-center  justify-between  py-1">
          <p className="font-light text-md">Order Shipped</p>
          <div className="flex items-end justify-end">
            <p>
              <Switch />
            </p>{" "}
            <p>
              <Switch />
            </p>
          </div>
        </div>{" "}
        <div className="flex items-center  justify-between  py-1">
          <p className="font-light text-md">Order Delivered</p>
          <div className="flex items-end justify-end">
            <p>
              <Switch />
            </p>{" "}
            <p>
              <Switch />
            </p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Notification;
