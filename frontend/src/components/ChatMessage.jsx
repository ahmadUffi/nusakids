import React from "react";

const ChatMessage = ({
  message,
  isUser,
  onPlayAudio,
  isPlayingAudio,
  isLoadingAudio,
}) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        } text-sm`}
      >
        <p>{message}</p>
        {!isUser && onPlayAudio && (
          <button
            onClick={onPlayAudio}
            disabled={isLoadingAudio}
            className={`mt-2 text-xs px-2 py-1 rounded ${
              isPlayingAudio
                ? "bg-red-500 text-white"
                : isLoadingAudio
                ? "bg-gray-400 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isLoadingAudio
              ? "Loading..."
              : isPlayingAudio
              ? "Stop"
              : "🔊 Play"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
