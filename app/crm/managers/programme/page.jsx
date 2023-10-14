"use client";

import React, { useState } from "react";
import PrimaryLayout from "@/components/layouts/primary.layouts";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeInvestor from "@/components/square/Home";
import { Container } from "@mui/material";
import ProgrammesHistory from "@/components/square/manager/programmes";
import DriverFooter from "@/components/square/DriverFooter";
import AddIcon from "@mui/icons-material/Add";
import AddProgrammeModal from "@/components/square/programme/addProgramme.modal";
import ManagerFooter from "@/components/managers/ManagerFooter";

const Page = () => {
  const [newDialog, setNewDialog] = useState(false);

  return (
    <div className="   mt-4 md:p-8">
      {/* <AddProgrammeModal open={newDialog} onClose={() => setNewDialog(false)} /> */}
      <ProgrammesHistory />{" "}
      {/* <button
        onClick={() => setNewDialog(true)}
        type="button"
        className="p-2 bg-blue-500 text-white text-center fixed bottom-28 w-12 h-12 rounded-full right-10"
      >
        <div className="my-auto mx-auto">
          <AddIcon />{" "}
        </div>
      </button> */}
      <ManagerFooter />
    </div>
  );
};

export default Page;
