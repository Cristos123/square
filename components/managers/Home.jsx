"use client";
import React from "react";
import { Bar, Pie, Line, HorizontalBar } from "react-chartjs-2";
import { Avatar, Container } from "@mui/material";
import NairaIcon from "../NairaIcon";
import WorkIcon from "@mui/icons-material/Work";
import DriverFooter from "./ManagerFooter";
import PaymentHistory from "./Portifolio";
import useSWR from "swr";
import PaymentHistoryManager from "./Portifolio";
import ManagerFooter from "./ManagerFooter";

const accessToken = globalThis.window?.localStorage.getItem("accessToken");
const getUserId =
  globalThis.window?.localStorage.getItem("manager_user") || null;
const baseUrl = process.env.NEXT_PUBLIC_ENDPOINT;

const HomeManager = () => {
  // Data and options for the charts go here
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${baseUrl}manager/${getUserId}`,
    fetcher
  );
  console.log({ data });
  const currentDate = new Date();
  return (
    <>
      <div className=" container px-4 flex flex-col">
        <div className="flex p-3 items-center">
          <Avatar alt="Remy Sharp" src="/assets/investors.jpg" />
          <div className="flex flex-col">
            <h1 className="md:text-3xl capitalize text-black px-2 font-bold ">
              {`${data?.manager_first_name}   ${data?.manager_last_name}`}
            </h1>
            <small className="text-xs px-2 text-black italic ">Manager</small>
          </div>
        </div>
        {/* <div className="flex-grow  p-2 md:p-8">
            <div className="bg-black text-white p-4 rounded-md shadow-md mb-4">
              <p className="text-base font-semibold mb-2">Returns</p>
              <p className="text-base mb-2">
                {" "}
                <NairaIcon value="50, 000, 000" />
              </p>
              <p className="text-base mb-2">
                Providus Bank - <span className="px-2">0234587990</span>
              </p>

              <div className="flex justify-end">
                <button className="px-4 outline outline-1  py-2 text-white mt-4 rounded-md">
                  Withdraw
                </button>
              </div>
            </div>
          </div>{" "} */}

        <div className="bg-black mx-auto   w-full h-52  sm:h-48 rounded-md flex  my-3 justify-between px-8 py-12">
          <div className="my-auto flex  space-y-3 justify-between flex-col h-10">
            <div className="text-sm font-bold text-blue-500">Payouts</div>
            <div className="text-white ">
              <NairaIcon value={"1,7000,000"} />
            </div>
            {/* <div className="text-white sm:flex w-full hidden py-2">
              {" "}
              <p>
                {" "}
                Providus Bank - <span className="sm:px-2 ">3689922335</span>
              </p>
            </div>{" "}
            <div className="text-white  sm:hidden w-full flex py-2">
              {" "}
              <p>
                {" "}
                Providus - <span className="sm:px-2 ">3689922335</span>
              </p>
            </div> */}
            {/* <div className="text-white sm:hidden py-2">
              {" "}
              Providus Bank - <span className="px-1">0234587990</span>
            </div> */}
            {/* <div className="text-xs text-center w-fit rounded-xl text-white px-5 py-3 mb-4  ring-1 ring-white">
              Withdraw
            </div> */}
          </div>
          <div className="my-auto flex justify-between flex-col h-full">
            <div className="font-bold text-right text-white text-xs flex space-x-1">
              <div className=" my-auto relative h-4 w-8">
                {/* <Image
                  src={"/assets/mastercardlogo.png"}
                  alt={"mastercard_logo"}
                  layout={"fill"}
                /> */}
              </div>
              <div className="my-auto">
                {/* ****3467 <ArrowDropDownIcon className="cursor-pointer" /> */}
              </div>
            </div>

            <div className="text-white p-2 space-x-2">
              {/* <AddCircleIcon className="cursor-pointer" />
              <RemoveCircleOutlineIcon className="cursor-pointer" /> */}
            </div>
          </div>
        </div>

        <PaymentHistoryManager />
        <ManagerFooter />
      </div>
    </>
  );
};

export default HomeManager;
