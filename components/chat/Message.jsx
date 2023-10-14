"use client";
import React, { useRef } from "react";

const MessageBubble = ({ sender, content, audioBlob }) => {
  const audioRef = useRef(null);

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
    <div
      className={`mb-2 ${
        sender === "user" ? "flex justify-end" : "flex justify-start"
      }`}
    >
      <div className={`mb-2 p-2 rounded-lg ${bubbleClasses}`}>
        {content}
        {audioBlob && (
          <div className="flex items-center mt-2">
            <audio controls ref={audioRef} onPlay={handleAudioPlay}>
              <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
