"use client";

import AssestsOutModal from "@/components/modals/assets/AssetsOut.modal";
import AssestsTransferModal from "@/components/modals/assets/AssetsTransfer.modal";
import AddDeductionModal from "@/components/modals/deduction/addDeduction.modal";
import React, { useCallback, useState } from "react";

function AssetsCard({
  className,
  image,
  title,
  subtitle,
  description,
  location,
  date,
}) {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  // const handleAssetsOutModalOpen = () => {
  //   setIsModal1Open(true);
  // };
  const handleAssetsOutModalOpen = useCallback(() => {
    setIsModal1Open(true);
  }, []);

  const handleModal2Open = useCallback(() => {
    setIsModal2Open(true);
  }, []);

  return (
    <div
      className={`flex flex-col bg-white shadow-lg cursor-pointer w-full rounded-lg overflow-hidden ${className}`}
    >
      <div className="relative overflow-hidden group">
        {image && (
          <>
            <img
              src={image}
              alt={title}
              width={100}
              height={40}
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
          </>
        )}
        <div className="p-4">
          {title && <h3 className="lg:text-xl font-semibold mb-2">{title}</h3>}
          {subtitle && <p className="text-gray-600 mb-2">{subtitle}</p>}
          {description && <p className="mb-2">{description}</p>}
          {location && <p className="text-gray-400 text-sm mb-1">{location}</p>}
          {date && <p className="text-gray-400 text-sm">{date}</p>}

          {/* Buttons for opening modals */}
          <div className="mt-2 space-x-2  flex flex-row">
            <button
              type="button"
              onClick={handleAssetsOutModalOpen}
              className="bg-blue-500 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Assets Out
            </button>
            <button
              type="button"
              onClick={handleModal2Open}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Transfer
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModal1Open && (
        <AssestsOutModal
          // storeId={storeId}
          open={isModal1Open}
          onClose={() => setIsModal1Open(false)}
        />
      )}
      {isModal2Open && (
        <AssestsTransferModal
          open={isModal2Open}
          onClose={() => setIsModal2Open(false)}
        />
      )}
    </div>
  );
}

function YourModalComponent1({ onClose }) {
  // Implement your Modal 1 content and logic here
  return (
    <div className="modal">
      {/* Your Modal 1 content */}
      <button onClick={onClose}>Close Modal 1</button>
    </div>
  );
}

function YourModalComponent2({ onClose }) {
  // Implement your Modal 2 content and logic here
  return (
    <div className="modal">
      {/* Your Modal 2 content */}
      <button onClick={onClose}>Close Modal 2</button>
    </div>
  );
}

export default AssetsCard;
