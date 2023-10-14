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
import { useState, useEffect } from "react";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { registerPlugin } from "react-filepond";

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);
function SecondaryLayout(props) {
  const [storeId, setStoreId] = useState(null)
  useEffect(() => {
      if (storeId == null) {
          let store_id = globalThis.window?.location.href
          setStoreId(store_id?.split('/')[4])
      }
  }, [storeId])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <main className="flex min-h-screen flex-col  bg-white">
      <div className="p-4 border">
        <div className="flex ">
        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="cursor-pointer font-bold"
          onClick={handleClick}
        >
          <MenuIcon />
        </div>
        <div className="mx-auto font-bold">{props.title}</div>
        </div>
        <React.Fragment>
        <Drawer
          anchor={'left'}
          open={open}
          onClose={handleClose}
        >
          <Box
            sx={{ width: 250,  }}
            role="presentation"
            onClick={handleClose}
            onKeyDown={handleClose}
            
          >
            
            <List>
                <Link href={`/store/${storeId}`}>
                  <MenuItem onClick={handleClose} disablePadding>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                  </MenuItem>
                </Link>

                <Link href={`/store/${storeId}/branding`}>
                  <MenuItem onClick={handleClose} disablePadding>
                    <ListItemIcon>
                      <RoomPreferencesIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={'Branding'} />
                  </MenuItem>
                </Link>
                <Link href={`/store/${storeId}/deliveries`}>
                  <MenuItem onClick={handleClose} disablePadding>
                    <ListItemIcon>
                      <LocalShippingIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={'Deliveries'} />
                  </MenuItem>
                </Link>
                {/* <Link href={"template"}>
                <MenuItem onClick={handleClose} disablePadding> 
                  <ListItemIcon>
                    <CameraIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={'Template'}/>
                </MenuItem>
              </Link> */}
                {/* <Link href={"/store"}>
                <MenuItem onClick={handleClose} disablePadding>
                  <ListItemIcon>
                    <StoreIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={'Switch Store'}/>
                </MenuItem>
              </Link> */}
                <div className="text-xs text-gray-300 fixed bottom-4 text-center w-fit left-4">Audstack v1.0</div>
              </List>
          </Box>
        </Drawer>
        </React.Fragment>
      </div>
      <div className="">{props.children}</div>
    </main>
  );
}

export default SecondaryLayout;
