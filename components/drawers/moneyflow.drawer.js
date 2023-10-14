'use client'

import { ToastContainer } from "react-toastify";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CameraIcon from "@mui/icons-material/Camera";
import Link from "next/link";
import StoreIcon from "@mui/icons-material/Store";
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box';

import List from '@mui/material/List';


function MoneyFlowDrawer(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  return (
    <main className="flex  flex-col  bg-white">
      <div className="p-4 border">
        <div className="grid grid-cols-2 gap-x-2 fixed left-0 w-full bottom-1 px-4">
          <div
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className="cursor-pointer font-bold"
            onClick={handleClick}
          >
            <div className="text-center border rounded-md px-4 py-2 bg-white cursor-pointer">
              Money In
            </div>
          </div>
          <div
            id="basic-button"
            aria-controls={open1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            className="cursor-pointer font-bold"
            onClick={handleClick1}
          >
            <div className="text-center bg-black rounded-md text-white px-4 py-2 cursor-pointer">
              Money Out
            </div>
          </div>
        </div>
        <React.Fragment>
          <Drawer anchor={"bottom"} open={open} onClose={handleClose}>
            <Box
              sx={{ width: "100%", padding: "2rem" }}
              role="presentation"
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <div className="text-center font-bold w-full mb-4">Money In</div>

              <List>
                <Link href={`/store/${props.storeId}/standardinvoice`}>
                  <MenuItem onClick={handleClose} disablePadding>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={"Standard invoice"} />
                  </MenuItem>
                </Link>
              </List>
            </Box>
          </Drawer>

          <Drawer anchor={"bottom"} open={open1} onClose={handleClose1}>
            <Box
              sx={{ width: "100%", padding: "2rem" }}
              role="presentation"
              onClick={handleClose1}
              onKeyDown={handleClose1}
            >
              <div className="text-center font-bold w-full mb-4">Money Out</div>

              <List>
                <Link href={`/store/${props.storeId}/spendrecord`}>
                  <MenuItem onClick={handleClose1} disablePadding>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={"Spend Record"} />
                  </MenuItem>
                </Link>
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      </div>
    </main>
  );
}

export default MoneyFlowDrawer;
