"use client";

import React, { useState } from "react";
import PrimaryLayout from "@/components/layouts/primary.layouts";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeInvestor from "@/components/square/Home";
import { Container } from "@mui/material";
import TripsHistory from "@/components/square/programme/Trips";
import DriverFooter from "@/components/square/DriverFooter";
import AddIcon from "@mui/icons-material/Add";
import AddProgrammeModal from '@/components/square/programme/addProgramme.modal'
import AddParticipantModal from "@/components/square/participant/AddParticipant.modal";
import { useSearchParams } from "next/navigation";
import ParticipantPage from "@/components/square/participant/ShowParticipant";

const Page = () => {
  const [newDialog, setNewDialog] = useState(false);

  const searchParams = useSearchParams();

  const programeId = searchParams.get("programe_id");
  return (
    <div className="   mt-4 md:p-8">
      <AddParticipantModal open={newDialog}  programeId={programeId} onClose={() => setNewDialog(false)} />
      <ParticipantPage  programeId={programeId}/>{" "}
      {/* <ParticipantCard  programeId={programeId}/>{" "} */}
      <button
        onClick={() => setNewDialog(true)}
        type="button"
        className="p-2 bg-blue-500 text-white text-center fixed bottom-28 w-12 h-12 rounded-full right-10"
      >
        <div className="my-auto mx-auto">
          <AddIcon />{" "}
        </div>
      </button>
      <DriverFooter />
    </div>
  );
};

export default Page;
