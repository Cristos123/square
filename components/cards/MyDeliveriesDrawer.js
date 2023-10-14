import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import useSWR from 'swr'
import axios from 'axios';
import { toast } from "react-toastify";

const labels = {
  0: 'Choose a rating',
  1: 'Very Poor',
  2: 'Poor',
  3: 'Good',
  4: 'Satisfactory',
  5: 'Excellent',
};
const accessToken = globalThis.window?.localStorage.getItem("accessToken");
export default function MyDeliveriesDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false)
  const [storeId, setStoreId] = React.useState(null);
  React.useEffect(() => {
    if (storeId == null) {
      let store_id = globalThis.window?.location.href;
      setStoreId(store_id?.split("/")[4]);
    }
  }, [storeId]);

  const handleDeliveryAction = async (action) => {
    setLoading(true);
    console.log(props.delivery)
    const json = JSON.stringify({ time: '', action: action });
    try {
      toast("Please wait...");
      console.log(json);
      // route to delivery
      const response = await axios.put(
        `https://api.instadrop.com.ng/api/store-delivery/${props?.delivery?.id}/store/update`,
        json,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        toast("Successful");
        // reloads page after 2seconds
        setTimeout(() => globalThis?.window.location.reload(), 2000);
        // setLoading(false);
      } else {
        toast("Failed");
        setLoading(false);
      }
    } catch (e) {
      toast("Something went wrong");
      setLoading(false);
      console.log(e);
    }

  };


  const handleDispatcherAssign = async (dispatcher) => {
    setLoading(true);
    const json = JSON.stringify({ dispatcher: dispatcher?.id });
    try {
      toast("Please wait...");
      console.log(json);
      // route to delivery
      const response = await axios.put(
        `https://api.instadrop.com.ng/api/store-delivery/${props?.delivery?.id}`,
        json,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        setTimeout(() => handleDeliveryAction('assigned'), 2000);
      } else {
        toast("Failed");
        setLoading(false);
      }
    } catch (e) {
      toast("Something went wrong");
      setLoading(false);
      console.log(e);
    }
  };

  const fetcher = (...args) =>
  fetch(...args, { headers: { authorization: `Bearer ${accessToken}` } }).then(
    (res) => res.json()
  );
  const { data, error, isLoading } = useSWR(
    storeId ? `https://api.instadrop.com.ng/api/store-dispatcher/store/${storeId}` : null,
    fetcher
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const dispatcherList = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {typeof data=='object'&&data?.map((pilot, index) => (
          <ListItem disabled={loading} onClick={() => handleDispatcherAssign(pilot)} key={pilot.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SportsMotorsportsIcon />
              </ListItemIcon>
              <ListItemText primary={`${pilot?.first_name} ${pilot?.last_name}`} secondary={props?.delivery?.dispatcher?.id == pilot?.id ? 'Assigned' : ""} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const deliveredDialog = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='p-8'>
        <div className='text-black'>
          <div className='font-bold text-lg'>Are you sure?</div>
          <div className='text-gray-700'>This action cannot be reversed.</div>
        </div>
        <div className='flex  space-x-4 w-full md:w-[60%] mt-4 text-center'>
          <div disabled={loading} onClick={() => handleDeliveryAction('delivered')} className='text-white bg-black rounded-md p-2 w-1/2'>Yes</div>
          <div className='text-black border border-black rounded-md p-2 w-1/2'>No</div>
        </div>

      </div>
    </Box>
  );

  const cancelDialog = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='p-8'>
        <div className='text-black'>
          <div className='font-bold text-lg'>Are you sure you want to cancel?</div>
          <div className='text-gray-700'>This action cannot be reversed.</div>
        </div>
        <div className='flex  space-x-4 w-full md:w-[60%] mt-4 text-center'>
          <div disabled={loading} onClick={() => handleDeliveryAction('canceled')} className='text-white bg-black rounded-md p-2 w-1/2'>Yes</div>
          <div className='text-black border border-black rounded-md p-2 w-1/2'>No</div>
        </div>

      </div>
    </Box>
  );

  const pickedDialog = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='p-8'>
        <div className='text-black'>
          <div className='font-bold text-lg'>Are you sure?</div>
          <div className='text-gray-700'>This action cannot be reversed.</div>
        </div>
        <div className='flex  space-x-4 w-full md:w-[60%] mt-4 text-center'>
          <div disabled={loading} onClick={() => handleDeliveryAction('picked')} className='text-white bg-black rounded-md p-2 w-1/2'>Yes</div>
          <div className='text-black border border-black rounded-md p-2 w-1/2'>No</div>
        </div>

      </div>
    </Box>
  );

  const enrouteDialog = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='p-8'>
        <div className='text-black'>
          <div className='font-bold text-lg'>Are you sure?</div>
          <div className='text-gray-700'>This action cannot be reversed.</div>
        </div>
        <div className='flex  space-x-4 w-full md:w-[60%] mt-4 text-center'>
          <div disabled={loading} onClick={() => handleDeliveryAction('enroute')} className='text-white bg-black rounded-md p-2 w-1/2'>Yes</div>
          <div className='text-black border border-black rounded-md p-2 w-1/2'>No</div>
        </div>

      </div>
    </Box>
  );

  const rateDispatcherDialog = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='p-8'>
        <div className='text-black'>
          <div className='text-center mb-8'>Rate Dispatcher</div>
          <div className='w-fit mx-auto'><Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size='large' />
            <div className='font-bold text-center'>{labels[value]}</div></div>
          <div className='mt-4'>
            <textarea placeholder='Review' cols={2} className='focus:outline-none resize-none border rounded-md w-full p-4' />
          </div>
        </div>
        <div className='flex  space-x-4 w-full md:w-[60%] mt-4 text-center'>
          <div className='text-white bg-black rounded-md p-2 w-1/2'>Submit</div>
          <div className='text-black border border-black rounded-md p-2 w-1/2'>Cancel</div>
        </div>

      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={'bottom'}
          open={props.open}
          onClose={props.onClose}
        >
          {props.type == 'assign' && dispatcherList('bottom')}
          {props.type == 'delivered' && deliveredDialog('bottom')}
          {props.type == 'cancel' && cancelDialog('bottom')}
          {props.type == 'picked' && pickedDialog('bottom')}
          {props.type == 'enroute' && enrouteDialog('bottom')}
          {props.type == 'rate' && rateDispatcherDialog('bottom')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}