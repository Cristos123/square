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
import WifiFindIcon from "@mui/icons-material/WifiFind";
const PassengerFooter = () => {
  const [currentPath, setCurrentPath] = React.useState(
    globalThis?.window?.location.pathname
  );

  const [route, setRoute] = React.useState(null);
  React.useEffect(() => {
    if (route == null) {
      let path = globalThis.window?.location.href;

      setRoute(path?.split("/")[4]);
    }
  }, [route]);
  return (
    <nav className="bg-yellow-500 py-1 shadow-md fixed bottom-0 left-0 right-0">
      <Container>
        <div className="container mx-auto flex justify-between">
          <Link
            href="/passenger"
            className={`${
              route === undefined ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <HomeIcon fontSize="large" />
          </Link>
          <Link
            href="/passenger/trips"
            className={`${
              route === "trips" ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <CatchingPokemonIcon fontSize="large" />
          </Link>
          <Link
            href="/passenger/explore"
            className={`${
              route === "explore" ? "text-black" : "text-white"
            } text-5xl hover:text-gray-800 px-2 md:px-4 py-2`}
          >
            <WifiFindIcon fontSize="large" />
          </Link>

          <Link
            href="/passenger/profile"
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

export default PassengerFooter;
