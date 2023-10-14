"use client";
import Image from "next/image";
import React from "react";

const CustomCard = ({
  title,
  image,
  subtitle,
  description,
  location,
  date,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col bg-white shadow-lg cursor-pointer rounded-lg overflow-hidden ${className}`}
    >
      <div className="relative overflow-hidden group">
        {image && (
          <>
            <Image
              src={image}
              alt={title}
              width={100}
              height={40}
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        )}
        <div className="p-4">
          {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
          {subtitle && <p className="text-gray-600 mb-2">{subtitle}</p>}
          {description && <p className="mb-2">{description}</p>}
          {location && <p className="text-gray-400 text-sm mb-1">{location}</p>}
          {date && <p className="text-gray-400 text-sm">{date}</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
