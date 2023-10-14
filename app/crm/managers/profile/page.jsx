"use client";

import React, { useState } from "react";
import PrimaryLayout from "@/components/layouts/primary.layouts";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeInvestor from "@/components/square/Home";
import { Avatar, Container } from "@mui/material";
import DriverFooter from "@/components/square/DriverFooter";
import AddIcon from "@mui/icons-material/Add";
import Loading from "@/components/loader/loading";
import useSWR from "swr";
import ManagerFooter from "@/components/managers/ManagerFooter";

const accessToken = globalThis.window?.localStorage.getItem("accessToken");
const getUserId =
  globalThis.window?.localStorage.getItem("manager_user") || null;
const Page = () => {
  const [newDialog, setNewDialog] = useState(false);

  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}manager/${getUserId}`,

    fetcher
  );
  console.log({ data });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container   mt-10 mx-auto md:p-8">
      <h2 className="text-center py-5 font-semibold text-3xl">Profile</h2>
      <div className="min-h-screen my-5 flex flex-col w-full  text-black p-4 py-8">
        <Avatar
          sx={{ width: 94, height: 94 }}
          className="mx-auto"
          alt={"seun"}
          src="/assets/investors.jpg"
        />
        <div className="my-8 space-y-8">
          <div>
            <div className="border-black  uppercase border-b">
              Finance Manager
            </div>
            <div className="flex justify-between">
              <div>ID:</div>
              <div>20303033</div>
            </div>
            <div className="flex justify-between">
              <div>Name:</div>
              <div>{`${data?.manager_first_name}   ${data?.manager_last_name}`}</div>
            </div>
            <div className="flex justify-between">
              <div>Email:</div>
              <div>{data?.email}</div>
            </div>
          </div>
        </div>
      </div>
      <ManagerFooter />
    </div>
  );
};

export default Page;
