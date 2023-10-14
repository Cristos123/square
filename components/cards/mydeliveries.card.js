import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from 'react';
import MyDeliveriesMenu from "./MyDeliveriesMenu";
import { useRouter } from "next/navigation";
import { SportsMotorsports } from "@mui/icons-material";




function MyDeliveriesCardComponent(props) {
  console.log(props.delivery, "0")
  const router = useRouter()
  return (
    <div className="w-full flex justify-between border-b p-2 text-black">
      <div className="flex space-x-2">
        <div>
          <ChatIcon />
        </div>
        <div>
          <div className="font-bold cursor-pointer">{props?.delivery?.sender_name} | {props?.delivery?.sender_address}&nbsp;<span className=" font-normal">({props?.delivery?.waybill})</span></div>
          <div className="text-xs">
            <div>
              <span className="font-bold">To :</span> {props?.delivery?.receiver_name}, {props?.delivery?.receiver_phone_1}, {props?.delivery?.receiver_phone_2}, {props?.delivery?.receiver_address}
            </div>
            <div>
              {props?.delivery?.proxy?.length ? <span className="font-bold">Proxy : {props?.delivery?.proxy}, {props?.delivery?.proxy_phone}</span> : ""}
            </div>

            <div>
              {props?.delivery?.note?.length ? <span className="font-bold">Note : {props?.delivery?.note}</span> : ""}
            </div>


            {props?.delivery?.dispatcher ? <div>
              <span className="font-bold">Assigned To :</span > <span className="text-green-500">{props?.delivery?.dispatcher?.first_name}&nbsp;{props?.delivery?.dispatcher?.last_name}
              </span></div> :props.status !=='new'?null:<div>
              <span className="font-bold"></span > <span className="text-red-500 animate-pulse"><SportsMotorsports fontSize="small"/></span>
            </div>} 
          </div>
        </div>
      </div>

      <div>
        {/* <div className="font-bold text-center">N 4000</div> */}
        <div className="my-auto">
          <div className="text-right">
            <MyDeliveriesMenu delivery={props.delivery} status={props.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDeliveriesCardComponent;
