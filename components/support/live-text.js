import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import { useState } from "react";
export default function LiveChatText(props) {
  const [view, setView] = useState("WA");
  const [isOpen, setIsOpen] = useState(false);
  return !!isOpen ? (
    <div className="max-h-screen  h-screen md:h-auto  text-black md:shadow-md  w-screen md:w-1/2 lg:w-1/3 bg-gray-100 fixed top-0 left-0 md:left-[70%] md:transform md:-translate-x-1/2 md:top-4 lg:left-2/4 lg:transform lg:translate-x-1/3 left z-[999999] md:rounded-2xl">
      <div className=" rounded-b-3xl shadow-sm w-full bg-white px-4 pt-4 pb-12 fixed left-0 top-0">
        <div className="flex justify-between">
          <div className="font-bold  text-2xl text-black">Audstack Support Team</div>
          <div
            className="text-gray-500 hover:text-gray-400 h-fit w-fit"
            onClick={() => setIsOpen(false)}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </div>
        </div>
        <div className="text-xs rounded-full px-2 py-1 shadow w-fit text-green-600">
          Online
        </div>
        <div>Hi there 👋
          How can we help?</div>
        {/* <div className="grid lg:grid-cols-4 grid-cols-4 md:grid-cols-3 h-[5.5rem] lg:h-16 xl:h-24 gap-x-2 mt-12">
          <div>
            <div className=" rounded-lg h-[80%] w-full">
              <img
                style={{ height: "full", width: "full", objectFit: "fill" }}
                className="mx-auto bg-white my-auto rounded-lg "
                src="https://res.cloudinary.com/neonatar-media/image/upload/v1689247096/20230427_200129_dfk5cq.jpg"
              />
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              <div>Esther</div>
            </div>
          </div>
          <div>
            <div className=" rounded-lg h-[80%] w-full">
              <img
                style={{ height: "full", width: "full", objectFit: "fill" }}
                className="mx-auto bg-white my-auto rounded-lg "
                src="https://res.cloudinary.com/neonatar-media/image/upload/v1689247046/20230713_121540_efvjtv.jpg"
              />
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              <div>Clara</div>
            </div>
          </div>
          <div>
            <div className=" rounded-lg h-[80%] w-full">
              <img
                style={{ height: "full", width: "full", objectFit: "fill" }}
                className="mx-auto bg-white my-auto rounded-lg "
                src="https://res.cloudinary.com/neonatar-media/image/upload/v1689247047/20230713_121506_ie50yf.jpg"
              />
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              <div>Dami</div>
            </div>
          </div>
          <div>
            <div className=" rounded-lg h-[80%] w-full">
              <img
                style={{ height: "full", width: "full", objectFit: "fill" }}
                className="mx-auto bg-white my-auto rounded-lg "
                src="https://res.cloudinary.com/neonatar-media/image/upload/v1689247029/20230713_121428_df0cou.png"
              />
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              <div>Ebere</div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="p-4 mt-72 overflow-y-auto md:h-64  flex w-full flex-col md:pb-16">
        {view == "WA" && (
          <>
            <div className="flex space-x-4">
              <div className="h-12 w-12 rounded-lg flex bg-green-600">
                <div className="text-white w-fit h-fit my-auto mx-auto">
                  <WhatsAppIcon />
                </div>
              </div>

              <div className="p-4 w-fit md:w-1/2 bg-white shadow-sm rounded-lg">
                Reach us on WhatsApp! Start a conversation using the button
                below and we will try to reply as soon as possible.
              </div>
            </div>

            <a
              href={`https://wa.me/2348112806410`}
              className="mt-12 text-green-600 cursor-pointer bg-white py-4 mx-auto px-4 w-fit rounded-full shadow shadow-green-200 animate-bounce "
            >
              Open WhatsApp <ChatBubbleOutlineIcon className="text-gray-400" />
            </a>
            <div className="mt-8 text-gray-400 text-xs text-center">
              We run on <a className="font-bold" href={`https://app.audstack.com/auth/signup?ref=${props?.data?.home_owner?.reg_no}`} target="_blank">Audstack</a>
            </div>
          </>
        )}

        {view == "MA" && (
          <>
            <div className="flex space-x-4">
              <div className="h-12 w-12 rounded-lg flex bg-blue-600">
                <div className="text-white w-fit h-fit my-auto mx-auto">
                  <MailOutlineIcon />
                </div>
              </div>

              <div className="p-4 w-fit md:w-1/2 bg-white shadow-sm rounded-lg">
                Reach us on our Mail! Start a conversation using the button
                below and we will try to reply as soon as possible.
              </div>
            </div>

            <a href={`mailto:tobiadiks@gmail.com`} className="mt-12 text-blue-600 cursor-pointer bg-white py-4 mx-auto px-4 w-fit rounded-full shadow shadow-blue-200 animate-bounce ">
              Send Mail <ChatBubbleOutlineIcon className="text-gray-400" />
            </a>
          
          </>
        )}
      </div>
      <div className="fixed flex w-full pt-2 bottom-0 left-0 bg-gray-100 text-black">
        <div className="w-fit mx-auto flex">
          <div
            className={` px-4 pb-2 border-b-4 cursor-pointer ${view == "WA" && "border-b-green-500"
              }`}
            onClick={() => setView("WA")}
          >
            <WhatsAppIcon />
          </div>
          {
            <div
              className={` px-4 pb-2 border-b-4 cursor-pointer ${view == "MA" && "border-b-green-500"
                }`}
              onClick={() => setView("MA")}
            >
              <MailOutlineIcon />
            </div>
          }
        </div>
      </div>
    </div>
  ) : (
    <div
      className=" w-fit  cursor-pointer text-sm mb-8"
      onClick={() => setIsOpen(true)}
    >
       Contact Support <HeadsetMicOutlinedIcon fontSize="small" className="mx-auto my-auto " />

    </div>
  );
}
