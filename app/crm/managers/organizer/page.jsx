"use client";

import React, { useState } from "react";
import DriverFooter from "@/components/square/DriverFooter";
import AddIcon from "@mui/icons-material/Add";
import Fleets from "@/components/square/organizer/Fleets";
import AddOrganizerModal from "@/components/square/organizer/addOrgarnizer.modal";
import EditOrganizerModal from "@/components/square/organizer/EditOrganizer.modal";
import Loading from "@/components/loader/loading";
import useSWR from "swr";

export const carFleets = [
  {
    imageUrl: "/assets/car.webp",
    carName: "Toyota Corolla",
    model: "2023",
  },
  {
    imageUrl: "/assets/cars.jpg",
    carName: "Honda Civic",
    model: "2023",
  },
  {
    imageUrl: "/assets/Hyundai-Grand.jpg",
    carName: "Ford Mustang",
    model: "2023",
  },
  {
    imageUrl: "/assets/car.webp",
    carName: "Toyota Corolla",
    model: "2023",
  },
  {
    imageUrl: "/assets/cars.jpg",
    carName: "Honda Civic",
    model: "2023",
  },
  {
    imageUrl: "/assets/Hyundai-Grand.jpg",
    carName: "Ford Mustang",
    model: "2023",
  },
  {
    imageUrl: "/assets/car.webp",
    carName: "Toyota Corolla",
    model: "2023",
  },
  {
    imageUrl: "/assets/cars.jpg",
    carName: "Honda Civic",
    model: "2023",
  },
  {
    imageUrl: "/assets/Hyundai-Grand.jpg",
    carName: "Ford Mustang",
    model: "2023",
  },
  // Add more car fleet entries here
];
// const accessToken = getLocalStorageValue("accessToken");
// const getCarownerId = getLocalStorageValue("car_owner_user");

const accessToken = globalThis.window?.localStorage.getItem("accessToken");

const getUserId =
  globalThis.window?.localStorage.getItem("organizer_user") || null;
const Page = () => {
  const [newDialog, setNewDialog] = useState(false);
  const [customizeModal, setCustomizeModal] = useState(false);
  const [editData, setEditData] = useState();
  const [organizerId, setOrganizerId] = useState();

  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}organizer/organizer-user/${getUserId}`,

    fetcher
  );
  console.log({ data });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container   mt-1 mx-auto md:p-8">
      <AddOrganizerModal open={newDialog} onClose={() => setNewDialog(false)} />
      <EditOrganizerModal
        open={customizeModal}
        data={editData}
        organizerId={organizerId}
        onClose={() => setCustomizeModal(false)}
      />
      <div className="grid space-y-6  grid-cols-1 divide-y mb-32  my-7">
        <p className="px-2 text-center font-semibold md:text-xl text-base">
          Organizers
        </p>
        {data?.length > 0 &&
          data?.map((car, index) => (
            <Fleets
              key={index}
              car={car}
              carImage={carFleets[index]}
              onClick={() => {
                setCustomizeModal(true);
                setEditData(car);
                setOrganizerId(car.id);
              }}
            />
          ))}
        <button
          onClick={() => setNewDialog(true)}
          type="button"
          className="p-2 bg-blue-500 text-white text-center fixed bottom-28 w-12 h-12 rounded-full right-10"
        >
          <div className="my-auto mx-auto">
            <AddIcon />{" "}
          </div>
        </button>
      </div>
      <DriverFooter />
    </div>
  );
};

export default Page;
