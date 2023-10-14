"use client";
import React, { useState, useRef } from "react";
import { sendMessage } from "react-chat-engine";

const VoiceRecordingInput = ({ chatID }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  console.log({ chatID });
  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

      // Send the audioBlob to the chat using sendMessage
      const response = await sendMessage(chatID, {
        text: "Voice Message",
        files: [audioBlob],
      });

      if (response) {
        console.log("Voice message sent");
      } else {
        console.error("Failed to send voice message");
      }
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();

    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

    // Send the audioBlob to the chat using sendMessage
    const response = await sendMessage(chatID, {
      text: "Voice Message",
      files: [audioBlob],
    });

    if (response) {
      console.log("Voice message sent");
    } else {
      console.error("Failed to send voice message");
    }
  };

  //   const handleStopRecording = () => {
  //     setIsRecording(false);
  //     mediaRecorderRef.current.stop();
  //   };

  return (
    <div className="flex items-center p-4">
      {isRecording ? (
        <button
          onClick={handleStopRecording}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Stop Recording
        </button>
      ) : (
        <button
          onClick={handleStartRecording}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Start Recording
        </button>
      )}
    </div>
  );
};

export default VoiceRecordingInput;
