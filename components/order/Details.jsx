"use client";

import React from "react";

const Details = () => {
  return (
    <>
      <div className="flex flex-col w-full divide-y  ">
        <div className="w-full divide-y">
          <h2 className="text-blue-400">Orders</h2>
          {/* <div className="flex divide-y justify-evenly w">
          <p>Placed</p>
          <p>02/09/2022 11:10:55 AM</p>
        </div> */}
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Placed</p>
            <p className="text-center font-semibold flex-grow">
              02/09/2022 11:10:55 AM
            </p>
          </div>{" "}
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Oerder by</p>
            <p className="text-center font-semibold flex-grow">User</p>
          </div>{" "}
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Admin Note</p>
            <p className="text-center font-semibold flex-grow"></p>
          </div>
          <div className="flex items-center py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Payment Mode</p>
            <p className="text-center font-semibold flex-grow">
              Submit order, pay after balling
            </p>
          </div>{" "}
          <div className="flex  py-3 items-center space-y-5 space-x-4">
            <p className="text-left font-light">Transaction ID</p>
            <p className="text-center font-semibold flex-grow"></p>
          </div>{" "}
          <div className="flex   py-3 items-center space-y-5 space-x-4">
            <p className="text-left font-light">Ship To</p>
            <p className="text-center font-semibold flex-grow"></p>
          </div>
        </div>{" "}
        <div className="w-full py-3 divide-y">
          <h2 className="text-blue-400">Checkout</h2>
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Email</p>
            <p className="text-center font-semibold flex-grow">
              minagranda@gmail.com
            </p>
          </div>{" "}
        </div>{" "}
        <div className="w-full py-3 divide-y">
          <h2 className="text-blue-400">Amount</h2>
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Subtotal</p>
            <p className="text-center font-semibold flex-grow">&#8358; 1000</p>
          </div>{" "}
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Discount</p>
            <p className="text-center font-semibold flex-grow">&#8358; 0</p>
          </div>{" "}
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Adjustment</p>
            <p className="text-center font-semibold flex-grow">&#8358; 0</p>
          </div>{" "}
          <div className="flex items-center  py-3 space-y-5 space-x-4">
            <p className="text-left font-light">Total</p>
            <p className="text-center font-semibold flex-grow">&#8358; 1003</p>
          </div>{" "}
        </div>
      </div>

      <div className="flex mx-auto w-full">
        <div className="mx-auto w-full grid grid-cols-1 gap-x-2">
          <button
            type="button"
            className="p-2 bg-red-100 w-full text-red-600 border  hover:bg-red-700 hover:text-white   mt-4 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Details;
