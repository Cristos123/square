"use client";
import { Container } from "@mui/material";
import React, { useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AttachmentIcon from "@mui/icons-material/Attachment";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const MessageBubble = ({ sender, message, audioBlob }) => {
  const audioRef = useRef(null);

  const [inputValue, setInputValue] = useState("");

  const handleAudioPlay = () => {
    const allAudioElements = document.querySelectorAll("audio"); // Get all audio elements
    allAudioElements.forEach((audioElement) => {
      if (audioElement !== audioRef.current) {
        audioElement.pause();
        // audioElement.currentTime = 0;
      }
    });
  };
  const bubbleClasses =
    sender === "user" ? "bg-blue-300 text-right" : "bg-green-300 text-left";

  return (
    <div className="flex mx-auto flex-col h-full ">
      <div className="flex-1 p-4 overflow-y-auto">
        <div
          className={`mb-2  items-center flex justify-start
      `}
        >
          <div className="mb-2 p-4 rounded-t-2xl max-w-[34%]  rounded-br-2xl bg-gray-200    text-left">
            <p className="mb-2 p-4"> tope seun dayo idowu</p>{" "}
            <p className="mb-2 p-4 rounded-l ">
              {" "}
              tope seun dayo idowu <br />
              it seun instadrop fdafasdfasfsdfsdfsdf fsdfsdfsdfsdfsdf fsdffsf
              dfsdfsdf sdfsdf dfdf dfsd dfsd fsd fsdfsd fsdf sdfsdfsd
            </p>{" "}
            <p className="mb-2 p-2 rounded-l  "> tope seun dayo idowu</p>
          </div>
        </div>
        <div
          className={`mb-2 
        flex items-center  justify-end `}
        >
          <div className="mb-2 p-4 rounded-t-2xl max-w-[34%] rounded-bl-2xl bg-gray-100    text-right">
            <p className="mb-2 p-4 rounded-l   text-right">
              {" "}
              tope seun dayo idowu dffasd sd fsd fcsd f sd fsd f sd f sd
            </p>{" "}
            <p className="mb-2 p-4 rounded-l  text-right">
              {" "}
              tope seun dayo idowu <br />
              it seun instadrop
            </p>{" "}
            <p className="mb-2 p-2 rounded-l  text-right">
              {" "}
              tope seun dayo idowu
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-white border-t border-gray-200">
        <form className="flex w-full mr-2" /* onSubmit={handleTextSubmit} */>
          {/* <input
            // ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full relative p-2 border rounded-lg"
            placeholder="Type a message..."
          /> */}

          <div className="relative w-full">
            <span className="absolute left-2 cursor-pointer top-1/2 transform -translate-y-1/2">
              <EmojiEmotionsIcon />
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-10 pr-16 py-2 border rounded-lg"
              placeholder="Type a message..."
            />
            <span className="absolute right-10 top-1/2 cursor-pointer transform -translate-y-1/2">
              <AttachmentIcon />
            </span>
            <span className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2">
              <CameraAltIcon />
            </span>
          </div>

          <button
            type="submit"
            className="p-2 ml-2  text-purple-600 rounded-lg "
          >
            <SendIcon />
          </button>
        </form>

        {/* <ButtonToShow /> */}
      </div>
    </div>
  );
};

export default MessageBubble;
