import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NairaIcon from "@/components/NairaIcon";
import Link from "next/link";
import EditProgrammeModal from "./EditProgramme.modal";
import { formatAndCalculateDaysAgo } from "../../carowners/programme/Trips";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ViewJoinedTripModal from "./ViewJoinedTrip.modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CancelDrop from "../../popupNotification/CancelTrip";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography
        className="uppercase font-semibold "
        sx={{ fontSize: 16 }}
        color="text.secondary"
        gutterBottom
      >
        Ile-ife, osun <ArrowForwardIcon /> kosofe, lagos
      </Typography>
      <div className="flex justify-between">
        <div className="flex flex-col space-y-1 ">
          <Typography variant="p" component="div">
            2600
          </Typography>{" "}
          <Typography variant="p" component="div">
            date
          </Typography>
        </div>
        <div
          className={`flex items-center justify-center w-8 h-8 bg-yellow-500 text-black rounded-full`}
        >
          10
        </div>
      </div>
    </CardContent>
  </React.Fragment>
);
const token = globalThis.window?.localStorage.getItem("passenger_accessToken");

const CardTrips = ({ history }) => {
  const [customizeModal, setCustomizeModal] = useState(false);
  const [editData, setEditData] = useState();
  const [tripId, setTripId] = useState();
  const [viewJoinedTrip, setViewJoinedTrip] = useState(false);
  const [viewJoinedTripData, setViewJoinedTripData] = useState();
  const [checkInCheckout, setcheckinCheckout] = useState();
  const [ischeckIn, setIscheckIn] = useState(false);
  const [ischeckOut, setIscheckOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCheckInClick = () => {
    setIscheckIn(!ischeckIn); // Toggle the check-in state
    setIscheckOut(false);
    setInputValue(""); // Clear the input field when toggling
  };
  const handleCheckOutClick = () => {
    setIscheckOut(!ischeckOut); // Toggle the check-in state
    setIscheckIn(false);
    setInputValue(""); // Clear the input field when toggling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({ checkInCheckout });
    const json = JSON.stringify(checkInCheckout);
    try {
      toast("Please wait...");
      console.log(json);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}passenger-trips/checkin-checkout/${history?.passengerTrip?.id}`,
        json,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status == 201 || response.status == 200) {
        toast(response?.data?.message);
        console.log(json);
        setTimeout(() => globalThis?.window.location.reload(), 6000);
        setLoading(false);
      } else {
        toast("Failed to edit Passenger trip");
        setLoading(false);
      }
    } catch (e) {
      toast(e?.response?.data?.message || e?.message);
      setLoading(false);
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setcheckinCheckout((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log({ history });
  return (
    <Box>
      <EditProgrammeModal
        open={customizeModal}
        data={editData}
        tripId={tripId}
        onClose={() => setCustomizeModal(false)}
      />
      <ViewJoinedTripModal
        open={viewJoinedTrip}
        data={viewJoinedTripData}
        onClose={() => setViewJoinedTrip(false)}
      />
      <Card className="w-full" variant="outlined">
        <CardContent>
          <div className="flex justify-between ">
            <Typography
              onClick={() => {
                setCustomizeModal(true);
                setEditData(history.passengerTrip);
                setTripId(history.passengerTrip.id);
              }}
              className="uppercase cursor-pointer md:text-lg text-base font-semibold "
              gutterBottom
            >
              {history.passengerTrip.route_from}{" "}
              <ArrowForwardIcon fontSize="small" />{" "}
              {history.passengerTrip.route_to}
            </Typography>{" "}
            {history.passengerTrip.isJoined === true ? (
              <div className="text-yellow-500">
                <EventSeatIcon
                  onClick={() => {
                    setViewJoinedTrip(true);
                    setViewJoinedTripData(history.passengerTrip);
                  }}
                  fontSize="large"
                />
              </div>
            ) : (
              <Link
                href={`/passenger/trips/drop?route_from=${history.passengerTrip.route_from}&&route_to=${history.passengerTrip.route_to}&&tripId=${history.passengerTrip.id}`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 bg-yellow-500 text-black rounded-full`}
                >
                  {history.count}
                </div>
              </Link>
            )}
          </div>
          <div className="flex w-full justify-between">
            <div className="flex w-full  flex-col space-y-1 ">
              <span className="font-semibold">
                <NairaIcon className="font-semibold" value={2600} />
              </span>
              <span className="">
                check in otp:{" "}
                <strong>{history?.passengerTrip?.check_in}</strong>
              </span>{" "}
              <span className="">
                check out otp:{" "}
                <strong>{history?.passengerTrip?.check_out}</strong>
              </span>
              <div className="flex text-gray-400 w-full space-x-1   md:space-x-4 md:items-center">
                <span className="text-xs">
                  {formatAndCalculateDaysAgo(
                    history?.passengerTrip?.created_at
                  )}{" "}
                </span>
                {/* {history?.passengerTrip?.isCheck_in === false ? (
                  <>
                    <span
                      onClick={handleCheckInClick}
                      className="text-yellow-500  cursor-pointer"
                    >
                      Check in
                    </span>
                    <span>|</span>

                    <span className="text-yellow-500  cursor-pointer">
                      Cancel
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-yellow-500  cursor-pointer">
                      Checked In
                    </span>
                  </>
                )}
                <span>|</span>

                {history?.passengerTrip?.isCheck_out === false ? (
                  <span
                    onClick={handleCheckOutClick}
                    className="text-yellow-500 cursor-pointer"
                  >
                    Check out
                  </span>
                ) : (
                  <span
                    onClick={handleCheckOutClick}
                    className="text-yellow-500 cursor-pointer"
                  >
                    Checked Out
                  </span>
                )} */}

                {history.passengerTrip.isJoined === true && (
                  <>
                    {!history?.passengerTrip?.isCheck_in ? (
                      <>
                        <span
                          onClick={handleCheckInClick}
                          className="text-yellow-500 cursor-pointer"
                        >
                          Check in
                        </span>
                        <span>|</span>
                        <CancelDrop
                          tripId={history?.passengerTrip?.id}
                          dropId={history?.passengerTrip?.drop?.id}
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-yellow-500 cursor-pointer">
                          Checked In
                        </span>
                        <span>|</span>
                        {!history?.passengerTrip?.isCheck_out ? (
                          <span
                            onClick={handleCheckOutClick}
                            className="text-yellow-500 cursor-pointer"
                          >
                            Check out
                          </span>
                        ) : (
                          <span className="text-yellow-500 cursor-pointer">
                            Checked Out
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit}>
        {ischeckIn && (
          <>
            <div className="font-bold mt-4">
              Check In
              <span className="text-red-500 my-auto">*</span>
            </div>
            <input
              className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
              placeholder=" Check in token"
              name="check_in"
              onChange={handleChange}
              required
              disabled={loading}
              value={checkInCheckout?.check_in}
            />{" "}
            <div className="text-right mt-6">
              <button
                type="submit"
                className="bg-transparent text-right py-3 px-3 rounded-2xl border-yellow-500 border"
              >
                {"CheckIn"}
              </button>
            </div>
          </>
        )}{" "}
        {ischeckOut && (
          <>
            <div className="font-bold mt-4">
              Check Out
              <span className="text-red-500 my-auto">*</span>
            </div>
            <input
              className="p-2 border bg-transparent border-gray-800 rounded-md  focus:outline-none w-full"
              placeholder=" Checkout token"
              name="check_out"
              onChange={handleChange}
              required
              disabled={loading}
              value={checkInCheckout?.check_out}
            />{" "}
            <div className="text-right mt-6">
              <button
                type="submit"
                className="bg-transparent text-right py-3 px-3 rounded-2xl border-yellow-500 border"
              >
                {"CheckOut"}
              </button>
            </div>
          </>
        )}
      </form>
    </Box>
  );
};
export default CardTrips;
