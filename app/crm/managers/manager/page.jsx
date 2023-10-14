"use client";

import PrimaryLayout from "@/components/layouts/primary.layouts";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import AddDispatcherModal from "@/components/modals/addDispatcher.modal";
import { useState, useEffect } from "react";
import EditDispatcherModal from "@/components/modals/editDispatcher.modal";
import Loading from "@/components/loader/loading";
import useSWR from "swr";
import DriverFooter from "@/components/square/DriverFooter";
import AddManagerModal from "@/components/square/driver/AddManager";
import EditManagerModal from "@/components/square/driver/EditManager";

const accessToken = globalThis.window?.localStorage.getItem("accessToken");
const getCarownerId =
  globalThis.window?.localStorage.getItem("organizer_user") || null;
function Page() {
  const router = useRouter();
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState();
  const [managerId, setManagerId] = useState();

  const [storeId, setStoreId] = useState(null);
  useEffect(() => {
    if (storeId == null) {
      let store_id = globalThis.window?.location.href;
      setStoreId(store_id?.split("/")[4]);
    }
  }, [storeId]);

  const fetcher = (...args) =>
    fetch(...args, {
      headers: { authorization: `Bearer ${accessToken}` },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}manager/organizer-users/${getCarownerId}`,

    fetcher
  );
  console.log({ data });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4 md:mt-0  px-5  mx-auto md:p-8">
      <h2 className=" text-center text-lg py-3 font-semibold  ">Managers</h2>
      <AddManagerModal
        open={newDialog}
        onClose={() => setNewDialog(false)}
        storeId={storeId}
      />
      <EditManagerModal
        open={editDialog}
        onClose={() => setEditDialog(false)}
        data={editData}
        managerId={managerId}
      />

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          py: 6,
        }}
      >
        <>
          {" "}
          {data?.length > 0 &&
            data?.map((manager, index) => (
              <>
                <ListItem
                  key={index}
                  onClick={() => {
                    setEditDialog(true);
                    setEditData(manager);
                    setManagerId(manager.id);
                  }}
                  alignItems="flex-start"
                  className="cursor-pointer"
                >
                  <ListItemAvatar>
                    <Avatar alt={"manager"} src={manager.passport_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <span className="capitalize">
                          {" "}
                          {manager.manager_first_name}
                        </span>{" "}
                        <span className="capitalize">
                          {" "}
                          {manager.manager_last_name}
                        </span>
                      </>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {manager.phone_1}
                        </Typography>
                        <span className="text-green-500">{" - Active"}</span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
        </>
      </List>

      <button
        onClick={() => setNewDialog(true)}
        type="button"
        className="p-2 bg-blue-500 text-white text-center fixed bottom-28 w-12 h-12 rounded-full right-4"
      >
        <div className="my-auto mx-auto">
          <AddIcon />
        </div>
      </button>

      <DriverFooter />
    </div>
  );
}

export default Page;
