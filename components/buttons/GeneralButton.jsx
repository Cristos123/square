"use client";
import React from "react";

const Button = ({ children, outline, size, fullWidth, width, ...rest }) => {
  const baseClass = "rounded-md py-2 px-4 font-semibold";
  let className = "bg-blue-500 text-white";

  if (outline) {
    className = "border border-blue-500 text-blue-500";
  }

  if (size === "small") {
    className += " text-sm";
  } else if (size === "big") {
    className += " text-lg";
  }

  if (fullWidth) {
    className += " w-full";
  }

  if (width) {
    className += ` w-${width}`;
  }

  return (
    <button className={`${baseClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
