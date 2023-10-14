import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MyDeliveriesDrawer from "./MyDeliveriesDrawer";



export default function MyDeliveriesMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [actionType, setActionType] = React.useState(false)
const doAssignDrawer=()=>{
  // do something
  setActionType("assign")
  handleClose()
  setOpenDrawer(true)
}

const doDeliveredDrawer=()=>{
  // do something
  setActionType("delivered")
  handleClose()
  setOpenDrawer(true)
}

const doCancelDrawer=()=>{
  // do something
  setActionType("cancel")
  handleClose()
  setOpenDrawer(true)
}

const doPickedDrawer=()=>{
  // do something
  setActionType("picked")
  handleClose()
  setOpenDrawer(true)
}

const doEnrouteDrawer=()=>{
  // do something
  setActionType("enroute")
  handleClose()
  setOpenDrawer(true)
}

const doRateDrawer=()=>{
  // do something
  setActionType("rate")
  handleClose()
  setOpenDrawer(true)
}

  if (props.status == "new") {
    return (
      <div>
        <MyDeliveriesDrawer delivery={props?.delivery} open={openDrawer} onClose={()=>setOpenDrawer(false)} type={actionType}/>
        <MoreVertIcon onClick={handleClick} />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={doAssignDrawer}>Assign</MenuItem>
          <MenuItem onClick={doEnrouteDrawer}>Enroute</MenuItem>
          <MenuItem onClick={doDeliveredDrawer}>Delivered</MenuItem>
          <MenuItem onClick={doCancelDrawer}>Cancel</MenuItem>
        </Menu>
      </div>
    );
  }
  if (props.status == "assigned") {
    return (
      <div>
        <MoreVertIcon onClick={handleClick} />
        <MyDeliveriesDrawer delivery={props?.delivery} open={openDrawer} onClose={()=>setOpenDrawer(false)} type={actionType}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={doAssignDrawer}>Re Assign</MenuItem>
          <MenuItem onClick={doPickedDrawer}>Picked</MenuItem>
          <MenuItem onClick={doDeliveredDrawer}>Delivered</MenuItem>
          <MenuItem onClick={doCancelDrawer}>Cancel</MenuItem>
        </Menu>
      </div>
    );
  }
  if (props.status == "picked") {
    return (
      <div>
        <MoreVertIcon onClick={handleClick} />
        <MyDeliveriesDrawer delivery={props?.delivery} open={openDrawer} onClose={()=>setOpenDrawer(false)} type={actionType}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={doEnrouteDrawer}>Enroute</MenuItem>

        </Menu>
      </div>
    );
  }
  if (props.status == "enroute") {
    return (
      <div>
        <MoreVertIcon onClick={handleClick} />
        <MyDeliveriesDrawer delivery={props?.delivery} open={openDrawer} onClose={()=>setOpenDrawer(false)} type={actionType}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >

          <MenuItem onClick={doDeliveredDrawer}>Delivered</MenuItem>
        </Menu>
      </div>
    );
  }
  if (props.status == "delivered") {
    return (
      <div>
        <MoreVertIcon onClick={handleClick} />
        <MyDeliveriesDrawer delivery={props?.delivery} open={openDrawer} onClose={()=>setOpenDrawer(false)} type={actionType}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={doRateDrawer}>Rate dispatcher</MenuItem>
          <MenuItem onClick={handleClose}>Report dispatcher</MenuItem>

        </Menu>
      </div>
    );
  }
  if (props.status == "returned") {
    return (
      <div>
        <MoreVertIcon onClick={handleClick} />
        <MyDeliveriesDrawer delivery={props?.delivery} open={openDrawer} onClose={()=>setOpenDrawer(false)} type={actionType}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={doAssignDrawer}>Assign</MenuItem>
          <MenuItem onClick={doCancelDrawer}>Cancel</MenuItem>
        </Menu>
      </div>
    );
  }
  if (props.status == "canceled") {
    return (
      <div>
        <MoreVertIcon onClick={handleClick} />
        <MyDeliveriesDrawer delivery={props?.delivery} open={openDrawer} onClose={()=>setOpenDrawer(false)} type={actionType}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={doAssignDrawer}>Assign</MenuItem>

        </Menu>
      </div>
    );
  }
}
