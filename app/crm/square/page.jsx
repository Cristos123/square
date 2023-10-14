"use client";

import React, { useState } from "react";
import PrimaryLayout from "@/components/layouts/primary.layouts";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeInvestor from "@/components/square/Home";
import { Container } from "@mui/material";

const Page = () => {
  return (
    <div className="container   md:mt-4 mx-auto md:p-8">
      <div className="grid  min-h-screen grid-cols-1 divide-y  my-7">
        <HomeInvestor />
      </div>
    </div>
  );
};

export default Page;
