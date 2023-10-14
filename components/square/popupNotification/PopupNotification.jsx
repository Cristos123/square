import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import axios from "axios";

const accessToken = globalThis.window?.localStorage.getItem("accessToken");
export default function AlertDialog({ dropId }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const suspend = {
      status: "suspended",
      reason: "Driver request",
    };
    const json = JSON.stringify(suspend);
    try {
      toast("Please wait...");
      console.log({ json });

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}carowner/drop/suspend-drop/${dropId}`,
        json,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        toast(response?.data?.message);
        setTimeout(() => globalThis?.window.location.reload(), 6000);
        setLoading(false);
      } else {
        toast(response?.data?.message);
        setLoading(false);
      }
    } catch (e) {
      toast(e?.response?.data?.message || e?.message);
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="bg-transparent border rounded-xl border-yellow-500 py-1 md:py-3 px-3"
      >
        Suspend
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Suspend Drop?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to suspend this drop? You can always edit the
            trip by chaiging the time or date if you later available to move
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button onClick={handleSubmit} autoFocus>
            Suspend
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
