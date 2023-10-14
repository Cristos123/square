"use client";

import React, { useState, useRef, useEffect } from "react";
// import MessageBubble from "./Message";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import {
  ChatEngine,
  ChatList,
  ChatCard,
  NewChatForm,
  ChatFeed,
  ChatHeader,
  IceBreaker,
  MessageBubble,
  IsTyping,
  ConnectionBar,
  NewMessageForm,
  ChatSettings,
  ChatSettingsTop,
  PeopleSettings,
  PhotosSettings,
  OptionsSettings,
} from "react-chat-engine";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const inputRef = useRef(null);
  const mediaRecorder = useRef(null);
  const audioPlayerRef = useRef();
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [sendVoice, setSendVoice] = useState(false);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // setMessages([...messages, { sender: "user", content: inputValue }]);
    // setInputValue("");

    setMessages([...messages, { sender: "user", content: inputValue }]);
    setInputValue("");
  };
  const ButtonToShow = () => {
    if (recording) {
      return (
        <button
          className={`p-2 ${
            recording ? "bg-red-500" : "bg-blue-500"
          } text-white rounded-full`}
          onClick={handleVoiceSubmit}
        >
          Stop Recording
        </button>
      );
    } else {
      return (
        <>
          <div className="gap-4 flex  ">
            <button
              type="submit"
              className={`p-2 bg-blue-500 text-white rounded-full`}
              //   onClick={handleVoiceSubmit}
            >
              Send
            </button>{" "}
            <button
              className={`p-2  ${
                recording ? "bg-red-500" : "bg-blue-500"
              } text-white rounded-full`}
              onClick={handleVoiceSubmit}
            >
              <KeyboardVoiceIcon />
            </button>
          </div>
        </>
      );
    }
  };
  console.log({ audioBlob });
  const handleVoiceSubmit = () => {
    // console.log(a);
    console.log({ recording });
    if (!recording) {
      if (audioPlayerRef.current && !audioPlayerRef.current.paused) {
        audioPlayerRef.current.pause(); // Pause audio playback if playing
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Create a MediaRecorder instance using the microphone stream
          mediaRecorder.current = new MediaRecorder(stream);
          const chunks = [];

          // Start updating the progress bar
          const progressInterval = setInterval(() => {
            setRecordingProgress((prevProgress) =>
              Math.min(prevProgress + 10, 100)
            );
          }, 1000);

          // Event handler for when audio data is available
          mediaRecorder.current.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          // Event handler for when recording is stopped
          mediaRecorder.current.onstop = () => {
            clearInterval(progressInterval); // Clear the progress interval
            const audioBlob = new Blob(chunks, { type: "audio/wav" });

            const newMessages = [
              ...messages,
              { sender: "user", audio: audioBlob },
            ];
            setMessages(newMessages);
            setAudioBlob(audioBlob);
            setRecording(false);
            setRecordingProgress(0);
          };

          mediaRecorder.current.start();
          setRecording(true);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } else {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
      setRecordingProgress(0);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <MessageBubble
              key={index}
              sender={message.sender}
              content={message.content}
              audioBlob={audioBlob}
            />
          </div>
        ))}

        {recording && (
          <div className="mb-2 text-center">
            <MessageBubble
              sender="user"
              content={
                <div>
                  <p>Recording in progress...</p>
                  <div className="mt-2">
                    <div className="bg-gray-200 h-2 rounded-lg">
                      <div
                        className="bg-green-500 h-full rounded-lg"
                        style={{ width: `${recordingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        )}
      </div>
      <div className="flex items-center p-4 bg-white border-t border-gray-200">
        <form className="flex-1 mr-2" onSubmit={handleTextSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg ml-2"
          >
            Send
          </button>
        </form>
        <button
          type="button"
          className={`p-2 ${
            recording ? "bg-red-500" : "bg-blue-500"
          } text-white rounded-full`}
          onClick={handleVoiceSubmit}
        >
          {recording ? "Stop Recording" : <KeyboardVoiceIcon />}
        </button>
        {/* <ButtonToShow /> */}
      </div>
    </div>

    // <ChatEngine
    //   height="100vh"
    //   projectID="e47fb20f-830b-4b62-b8b4-6a875f17ae00"
    //   userName="cristos"
    //   userSecret="cristos"
    //   // development={props.development}
    //   // Customize UI
    //   renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
    //   renderChatCard={(chat, index) => (
    //     <ChatCard key={`${index}`} chat={chat} />
    //   )}
    //   renderNewChatForm={(creds) => <NewChatForm creds={creds} />}
    //   renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
    //   renderChatHeader={(chat) => <ChatHeader />}
    //   renderIceBreaker={(chat) => <IceBreaker />}
    //   renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => (
    //     <MessageBubble
    //       lastMessage={lastMessage}
    //       message={message}
    //       nextMessage={nextMessage}
    //       chat={chat}
    //     />
    //   )}
    //   renderIsTyping={(typers) => <IsTyping />}
    //   renderConnectionBar={(chat) => <ConnectionBar />}
    //   renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
    //   renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
    //   renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
    //   renderPeopleSettings={(creds, chat) => <PeopleSettings />}
    //   renderPhotosSettings={(chat) => <PhotosSettings />}
    //   renderOptionsSettings={(creds, chat) => <OptionsSettings />}
    // />
  );
};

export default ChatComponent;
