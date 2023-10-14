"use client";

import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import AddActivitiesModal from "./addActivities.modal";
import { Container } from "@mui/material";

const Activities = () => {
  const [newDialog, setNewDialog] = useState(false);
  return (
    <>
      <AddActivitiesModal
        open={newDialog}
        onClose={() => setNewDialog(false)}
      />
      <div className="flex flex-col w-full divide-y  ">
        <div className="w-full flex-col flex justify-between py-3 divide-y">
          <div className="flex justify-between  py-3 space-y-5 space-x-4">
            <div className="flex flex-col">
              <p className="text-left font-light">Payment status updated.</p>
              <p className="text-left font-light">
                Unpaid <ArrowRightAltIcon /> paid
              </p>
            </div>
            <p className=" font-light ">17 hours ago </p>
          </div>{" "}
          <div className="flex justify-between  py-3 space-y-5 space-x-4">
            <div className="flex flex-col">
              <p className="text-left font-light">Order status updated.</p>
              <p className="text-left font-">
                processing <ArrowRightAltIcon /> Delivered
              </p>
            </div>
            <p className=" font-light ">17 hours ago </p>
          </div>{" "}
          <div className="flex justify-between  py-3 space-y-5 space-x-4">
            <div className="flex flex-col">
              <p className="text-left font-light">Payment status updated.</p>
              <p className="text-left font-">
                Open <ArrowRightAltIcon /> Processing
              </p>
            </div>
            <p className=" font-light ">17 hours ago </p>
          </div>{" "}
          <div className="flex justify-between  py-3 space-y-5 space-x-4">
            <div className="flex flex-col">
              <p className="text-left font-light">New item added to order..</p>
              <p className="text-left font-">Salive pulpy (ck)</p>
            </div>
            <p className=" font-light ">1 day ago </p>
          </div>{" "}
          <div className="flex justify-between  py-3 space-y-5 space-x-4">
            <div className="flex flex-col">
              <p className="text-left font-light">Payment mode updated.</p>
              {/* <p className="text-left font-">Salive pulpy (ck)</p> */}
            </div>
            <p className=" font-light ">2 days ago </p>
          </div>{" "}
        </div>
      </div>{" "}
      <button
        onClick={() => setNewDialog(true)}
        type="button"
        className="p-2 bg-black text-white text-center fixed bottom-10 w-12 h-12 rounded-full right-10"
      >
        <div className="my-auto mx-auto">
          <AddIcon />{" "}
        </div>
      </button>
    </>
  );
};

export default Activities;
