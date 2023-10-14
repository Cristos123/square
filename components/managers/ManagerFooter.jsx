"use client";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DeckIcon from "@mui/icons-material/Deck";
import GavelIcon from "@mui/icons-material/Gavel";
import Person3Icon from "@mui/icons-material/Person3";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Container } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import Link from "next/link";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ArticleIcon from "@mui/icons-material/Article";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EventIcon from "@mui/icons-material/Event";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
const ManagerFooter = () => {
  const [currentPath, setCurrentPath] = React.useState(
    globalThis?.window?.location.pathname
  );

  React.useEffect(() => {
    // Define a function to handle changes to the pathname
    const handlePathnameChange = () => {
      setCurrentPath(globalThis?.window?.location.pathname);
    };

    // Add an event listener to the window to track pathname changes
    globalThis?.window.addEventListener("popstate", handlePathnameChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      globalThis?.window.removeEventListener("popstate", handlePathnameChange);
    };
  }, []);

  const [route, setRoute] = React.useState(null);
  React.useEffect(() => {
    if (route == null) {
      let path = globalThis.window?.location.href;

      setRoute(path?.split("/")[4]);
    }
  }, [route]);
  return (
    <nav className="bg-blue-500 py-1 shadow-md fixed bottom-0 left-0 right-0">
      <Container>
        <div className="container mx-auto flex justify-between">
          <Link
            href="/crm/managers/"
            className={`${
              route === undefined ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <HomeIcon fontSize="large" />
          </Link>
          <Link
            href="/crm/managers/programme"
            className={`${
              route === "programme" ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <EventIcon fontSize="large" />
          </Link>
          {/* <Link
            href="/crm/managers/organizer"
            className={`${
              route === "organizer" ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <HomeWorkIcon fontSize="large" />
          </Link>
          <Link
            href="/crm/square/manager"
            className={`${
              route === "manager" ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <PersonPinIcon fontSize="large" />
          </Link>{" "} */}
          <Link
            href="/crm/managers/profile"
            className={`${
              route === "profile" ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <Person3Icon fontSize="large" />
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default ManagerFooter;
