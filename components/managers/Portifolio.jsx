"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NairaIcon from "../NairaIcon";
import { ListItemIcon } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsIcon from "@mui/icons-material/Payments";

const formatDate = (date) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const day = new Date(date).getDate();
  const daySuffix = getDaySuffix(day);

  return `${formattedDate}`;
};
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const currentDate = new Date();
const paymentHistory = [
  {
    name: "John Doe",
    purpose: "3 days",
    amount: "15,000",
    date: new Date(),
    icon: <PaymentsIcon fontSize="medium" />,
  },
  {
    name: "Jane Smith",
    purpose: "3 days",
    amount: "15,000",
    date: new Date(),
    icon: <PaymentsIcon fontSize="medium" />,
  },
  {
    name: "Alice Johnson",
    purpose: "3 days",
    amount: "15,000",
    date: new Date(),
    icon: <PaymentsIcon fontSize="medium" />,
  },
  {
    name: "Robert Brown",
    purpose: "3  days",
    amount: "15,000",
    date: new Date(),
    icon: <PaymentsIcon fontSize="medium" />,
  },
];
export default function PaymentHistoryManager() {
  return (
    <div className="my-5 ">
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <p className="px-2">Payments</p>
        {paymentHistory.map((history, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "black",
            }}
          >
            <div className="flex items-center">
              <ListItemIcon className="">{history.icon}</ListItemIcon>
              <ListItemText
                primary={history.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {history.purpose}
                    </Typography>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {history.date.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </span>
                      <span>
                        {history.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </React.Fragment>
                }
              />
            </div>
            <div className="flex items-center">
              <ListItemText
                primary={<NairaIcon value={history.amount} />}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                  </React.Fragment>
                }
              />
            </div>
          </ListItem>
        ))}
      </List>{" "}
    </div>
  );
}
