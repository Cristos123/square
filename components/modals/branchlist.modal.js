import { Dialog, List, ListItem, ListSubheader } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import * as React from "react";
import useSWR from "swr";

const accessToken = globalThis.window?.localStorage.getItem("accessToken");
function BranchListModal(props) {
  const [storeId, setStoreId] = React.useState(null);
 
  React.useEffect(() => {
    if (storeId == null) {
      let store_id = globalThis.window?.location.href;
      setStoreId(store_id?.split("/")[4]);
    }
  }, [storeId]);

  const fetcher = (...args) =>
    fetch(...args, { headers: { authorization: `Bearer ${accessToken}` } }).then(
      (res) => res.json()
    );
  const { data, error, isLoading } = useSWR( storeId?
    `https://api.instadrop.com.ng/api/store-branch/store/${storeId}`: null,
    fetcher
  );




  return (
    <Dialog fullScreen open={props.open}>
      <div className=" px-4 fixed bottom-4 md:bottom-4 bg-transparent left-0 w-full  z-50">
        <input
          className="bg-gray-100 rounded-md w-full py-4 px-4 focus:outline-none border "
          placeholder="Find branch"
        />
      </div>
      <div className="w-full text-center mt-4 ">
        <CloseIcon onClick={props.onClose} className="cursor-pointer" />
      </div>
      <List
        sx={{ height: "12rem" }}
        subheader={
          <ListSubheader
            className="font-bold text-xl mt-4 text-center "
            component="div"
            id="nested-list-subheader"
          >
            <div>SELECT ANY OF OUR BRANCHES</div>
          </ListSubheader>
        }
      >
        {
          isLoading ?
            <div className="text-center">Loading...</div>
            :
            data?.map((branch, index) => (
              <ListItem
                key={index}
                onClick={()=>{props.onClose(); props.passData(branch)}}
                className="cursor-pointer"
              >{console.log(data)}
                <div className="flex space-x-2 h-fit">
                  <MyLocationIcon className="my-auto" fontSize="small" />
                  <div>
                    <div>{`${branch?.name} - ${branch?.reg_no}`}</div>
                    <div>{`${branch?.address}.`}</div>
                  </div>
                </div>
              </ListItem>
            ))}
      </List>
    </Dialog>
  );
}


export default BranchListModal;
