"use client";
import { useEffect, useRef, useState } from "react";
import { ApiService } from "../services/api";
import ChatMessage from "./ChatMessage";
import ModelViewer from "./ModelViewer";
import useResponsive from "../hooks/useResponsive";

export default function FloatChat({ provinsi }) {
  const [isActive, setIsActive] = useState(false);

  const { deviceName } = useResponsive();
  // audio

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [isProses, setIsProses] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeak, setIsSpeak] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.preload = "auto";
      audioRef.current.volume = 1.0;

      audioRef.current.onerror = (e) => {
        console.error("Audio playback error:", e);
        setPlayingAudioId(null);
        setAudioLoading(false);
      };

      audioRef.current.onloadeddata = () => {};
    }
  }, []);

  const generateChatHistory = () => {
    const history = [];
    for (let i = 0; i < messages.length; i += 2) {
      if (messages[i] && messages[i + 1]) {
        history.push({
          user: messages[i].text,
          bot: messages[i + 1].text,
        });
      }
    }
    return history;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() == "") return;
    setIsProses(true);
    const userMessage = {
      text: inputText,
      isUser: true,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const history = generateChatHistory();
      const response = await ApiService.generateText({
        history,
        province: provinsi,
        new_chat: inputText,
      });

      const botMessage = {
        text: response.response,
        isUser: false,
        id: (Date.now() + 1).toString(),
        type: "text",
      };

      await autoPlayLastBotMessage(botMessage); // tanpa await
    } catch (error) {
      console.error("Error generating text:", error);
      const errorMessage = {
        text: "Maaf, terjadi kesalahan saat memproses pesan Anda.",
        isUser: false,
        id: (Date.now() + 1).toString(),
        type: "text",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setInputText("");
      setIsProses(false);
    }
  };

  const autoPlayLastBotMessage = async (botMessage) => {
    if (!botMessage || !botMessage.text || botMessage.type === "image") return;

    if (botMessage.text.length < 5) {
      console.log("Text too short for audio generation");
      return;
    }

    await handlePlayAudio(botMessage.text, botMessage.id, botMessage);
  };

  const handlePlayAudio = async (text, messageId, response) => {
    console.log(text);
    if (playingAudioId === messageId) {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingAudioId(null);
      }
      return;
    }

    return new Promise(async (resolve, reject) => {
      try {
        setAudioLoading(true);
        setPlayingAudioId(messageId);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        const audioBlob = await ApiService.generateAudio({ text });
        setMessages((prev) => [...prev, response]);

        if (audioBlob.size === 0) throw new Error("Audio blob is empty");

        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Audio URL created:", audioUrl);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;

          // ⬇️ isSpeak TRUE saat audio siap
          setIsSpeak(true);

          audioRef.current.onended = () => {
            console.log("Audio playback ended");
            setPlayingAudioId(null);
            setAudioLoading(false);
            setIsSpeak(false); // ⬅️ isSpeak FALSE saat audio selesai
            URL.revokeObjectURL(audioUrl);
            resolve();
          };

          audioRef.current.oncanplaythrough = () => {
            console.log("Audio can play through");
            setAudioLoading(false);
          };

          audioRef.current.onerror = (e) => {
            console.error("Audio error:", e);
            setPlayingAudioId(null);
            setAudioLoading(false);
            setIsSpeak(false);
            URL.revokeObjectURL(audioUrl);
            reject(e);
          };

          await audioRef.current.play();
          console.log("Audio started playing");
        } else {
          throw new Error("Audio ref not available");
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setPlayingAudioId(null);
        setAudioLoading(false);
        setIsSpeak(false);
        alert("Gagal memutar audio. Silakan coba lagi.");
        reject(error);
      }
    });
  };

  const getPlaceholder = () => {
    return `Yuk tanya saraswati tentang budaya ${provinsi}`;
  };

  const squareStyle =
    "w-[350px] md:w-[400px] h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-300";
  const circleStyle =
    "w-[75px] overflow-hidden h-[75px] rounded-full bg-white border border-gray-300 shadow-xl flex items-center justify-center text-2xl cursor-pointer hover:scale-105 transition-all duration-200";

  return (
    <div
      className={`fixed bottom-6 ${
        deviceName === "mobile" ? "right-4" : "left-8"
      } z-50 font-sans`}
    >
      <div
        onClick={() => !isActive && setIsActive(true)}
        className={`transition-all duration-300 ${
          isActive ? squareStyle : circleStyle
        }`}
      >
        {!isActive ? (
          <div className="bg-amber-100">
            <div className="absolute shadow -top-5 z-90 left-[10%] translate-x-[-50%] not-last:text-sm py-1 bg-white  px-3">
              Hallo
            </div>
            <div className="relative z-10">
              <model-viewer
                src="/ui/profile.glb"
                width="30%"
                height="220px"
                camera-orbit="-30deg 90deg -10m"
                camera-target="1.2m 3.1m -2m"
                autoplay={true}
                instruction-prompt="none"
                field-of-view="20deg"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="p-2 text-right bg-gray-100 border-b border-gray-300">
              <button
                onClick={() => setIsActive(false)}
                className="text-sm p-1 rounded-full hover:bg-gray-200"
              >
                ❌
              </button>
            </div>
            <div className="bg-white m-auto mt-3 shadow h-[100px] w-[100px] flex justify-center items-center rounded-full overflow-hidden bg-gradient-to-b from-white via-gray-50 to-transparent">
              <ModelViewer
                src="/ui/profile-chat.glb"
                width="100%"
                height="220px"
                cameraOrbit="-15deg 75deg 6m"
                cameraControls={false}
                cameraTarget="0m 3m 0m"
                isSpeak={isSpeak}
              />
            </div>
            <div className="flex-1  overflow-y-auto p-4 space-y-3 bg-white">
              {messages.map((message, idx) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  onPlayAudio={() => handlePlayAudio(message.text, message.id)}
                  isPlayingAudio={playingAudioId === message.id}
                  isLoadingAudio={audioLoading && playingAudioId === message.id}
                />
              ))}
              {isTyping && (
                <div className="bg-gray-200 text-gray-800 text-[10px] px-4 py-2 rounded-xl w-fit animate-pulse">
                  Saraswati Sedang Berfikir...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t border-gray-200 bg-white ">
              <form
                onSubmit={(e) => handleSendMessage(e)}
                className="flex items-center gap-2"
              >
                <textarea
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Apa Yang ingin Kamu tanyakan Adik-adik "
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder={getPlaceholder()}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={2}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Kirim
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      <audio
        ref={audioRef}
        controls={process.env.NODE_ENV === "development"}
        className={
          process.env.NODE_ENV === "development" ? "mt-4 hidden" : "hidden"
        }
        preload="auto"
      />
    </div>
  );
}
