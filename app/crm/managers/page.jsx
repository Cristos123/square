"use client";

import React, { useState } from "react";
import HomeManager from "@/components/managers/Home";

const page = () => {
  return (
    <div className="container   md:mt-4 mx-auto md:p-8">
      <div className="grid  min-h-screen grid-cols-1 divide-y  my-7">
        <HomeManager />
      </div>
    </div>
  );
};

export default page;
