"use client";

import React from "react";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Badge from "@mui/material/Badge";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      {/* <Badge className="px-4" color="secondary" badgeContent="Unpaid" /> */}
      <div className="flex justify-between items-center">
        <div className=" flex flex-col  ">
          <p className="py-2 font-semibold">#{order.id}</p>

          <p className="">
            <Badge
              className="px-2"
              color="success"
              badgeContent={order.shipping}
            />
          </p>
          <div className="flex py-3 flex-row w-full">
            <div class="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-black font-semibold text-xl">#</span>
            </div>

            <div className="flex flex-col px-2">
              <p className="text-black">{order.number}</p>
              <p>{order.time}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="">&#8358; {order.price}</p>{" "}
          <p className="">
            <Badge
              className="px-2"
              color="warning"
              badgeContent={order.status}
            />
          </p>
          <div className="flex flex-row py-3">
            <p className="px-3 w-10 h-10 text-gray-600">
              <CallIcon />
            </p>{" "}
            <p className="px-3 w-10 h-10 text-gray-400">
              <WhatsAppIcon />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
