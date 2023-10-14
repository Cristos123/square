"use client";

import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const Items = () => {
  return (
    <>
      <div className="flex flex-col w-full divide-y  ">
        <div className="w-full flex justify-between mt-4">
          <div className="flex  flex-row  py-4 space-x-4">
            <img
              src="/assets/riceplate.avif"
              alt="rice"
              className="w-24 h-24"
            />
            <p className=" text-base font-semibold">Rice (Delicacy)</p>
          </div>{" "}
          <div className="flex  flex-col items-center space-x-4">
            <p className="text-center pb-2  ">&#8358; 700x3</p>
            <p className="text-center font-semibold ">&#8358; 700</p>
          </div>{" "}
        </div>

        <div className="w-full flex-col flex justify-between py-3 divide-y">
          <div className="flex justify-between  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Subtotal</p>
            <p className=" font-semibold ">&#8358; 1000 </p>
          </div>{" "}
          <div className="flex items-center  justify-between   py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Discount</p>
            <p className="text-center font-semibold ">
              &#8358; 0{" "}
              <span className="px-1">
                <EditIcon />
              </span>
            </p>
          </div>{" "}
          <div className="flex items-center  justify-between   py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Shipping Charge</p>
            <p className="text-center font-semibold ">
              &#8358; 0{" "}
              <span className="px-1">
                <EditIcon />
              </span>
            </p>
          </div>{" "}
          <div className="flex items-center  justify-between  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Adjustment</p>
            <p className="text-center font-semibold ">
              &#8358; 0{" "}
              <span className="px-1">
                <EditIcon />
              </span>
            </p>
          </div>{" "}
          <div className="flex items-center   justify-between  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Total</p>
            <p className="text-center font-semibold ">&#8358; 1003 </p>
          </div>{" "}
        </div>
      </div>
      <div className="flex mx-auto w-full">
        <div className="mx-auto w-full grid grid-cols-2 gap-x-2">
          <button
            type="button"
            className="p-2 bg-white w-full text-black border border-black   mt-4 rounded-md"
          >
            Manage Addons {/*   <DeleteIcon /> */}
          </button>
          <button
            className="p-2 bg-black w-full text-white mt-4 rounded-md"
            type={"submit"}
          >
            Add Order Item
          </button>
        </div>
      </div>
    </>
  );
};

export default Items;
