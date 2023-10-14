"use client";

import { IconButton } from "@mui/material";
import React from "react";

function FloatingButton({ label, icon, onClick, className }) {
  if (icon) {
    return (
      <IconButton
        className={`fixed bottom-4 right-4 bg-blue-500 h-20 w-20 text-white ${className}`}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    );
  }

  return (
    <button
      className={`fixed bottom-4 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default FloatingButton;
