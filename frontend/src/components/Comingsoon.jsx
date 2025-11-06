import { useState, useEffect, useMemo } from "react";
import ModelViewer from "./ModelViewer";
import { WordRotate } from "./ui/word-rotate";
import useResponsive from "../hooks/useResponsive";
import Button from "./ui/Button";
import { LightRays } from "./ui/light-rays";

export default function Hero({ className = "" }) {
  const [size, setSize] = useState(500);
  const [isGo, setIsgo] = useState(false);

  const { deviceName } = useResponsive();

  function useCountdown(targetDate) {
    const target = useMemo(() => targetDate.getTime(), [targetDate]);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
      const iv = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(iv);
    }, []);

    const diff = Math.max(0, target - now); // ms

    const secondsTotal = Math.floor(diff / 1000);
    const days = Math.floor(secondsTotal / (24 * 3600));
    const hours = Math.floor((secondsTotal % (24 * 3600)) / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = Math.floor(secondsTotal % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
      isFinished: diff === 0,
    };
  }

  const thisYear = new Date().getFullYear();
  const targetDate = useMemo(
    () => new Date(`${thisYear}-11-16T00:00:00`),
    [thisYear]
  );

  const { days, hours, minutes, seconds, isFinished } =
    useCountdown(targetDate);

  // friendly text if already started
  const finishedMessage = "Event sudah dimulai 🎉";

  useEffect(() => {
    if (!deviceName) return; // Jangan set apa pun sebelum hydration

    if (deviceName === "mobile") setSize(300);
    else if (deviceName === "tablet") setSize(700);
    else setSize(500);
  }, [deviceName]);
  if (!deviceName) return;

  const handleclick = async () => {
    setIsgo(true);
    // Play audio
    const audio = new Audio("/sounds/opening.mp3"); // letakkan file di public/sounds
    audio.play().catch((e) => {
      console.error("Audio gagal diputar:", e);
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };
  return (
    <section
      className="relative grid md:grid-cols-2 items-stretch bg-gradient-to-br from-white/60 via-slate-50/40 to-transparent overflow-hidden lg:h-screen sm:h-screen"
      aria-label="Hero - Hidupkan Kembali Budaya Indonesia"
    >
      {/* Left: text */}
      <div className="order-2 md:order-1 px-6 lg:pl-36 py-16 flex flex-col gap-8 justify-center z-40">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Hidupkan Kembali Budaya Indonesia
            <br className="hidden md:block" />
          </h2>

          <div className="mt-3 flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Lewat
            <span className="inline-block text-[#9c4712] dark:text-white">
              {/* WordRotate harus menerima className dan words */}
              <WordRotate
                className="inline-block"
                words={[
                  "Dunia Digital",
                  "3D Interaktif",
                  "Artificial Intelligence",
                ]}
              />
            </span>
          </div>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
            <strong>Bukan cuma dilihat, tapi dirasakan.</strong>
            <br />
            Temukan keunikan budaya dari berbagai penjuru Nusantara lewat
            pengalaman interaktif yang{" "}
            <span className="text-blue-400 font-semibold">modern</span> dan{" "}
            <span className="text-pink-400 font-semibold">menyenangkan</span>.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={handleclick}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-amber-500 text-white font-semibold shadow-lg hover:bg-amber-600 active:scale-[.99] transition"
              aria-label="Pergi Belajar"
            >
              🚀 Pergi Belajar
            </button>

            <a
              href="#learn-more"
              className="text-sm text-slate-600 underline underline-offset-2"
            >
              Pelajari lebih lanjut
            </a>
          </div>
        </div>

        {/* Countdown badge (style B - pill) */}
        <div className="mt-6">
          <div className="inline-flex items-center gap-3 bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-slate-200">
            <svg
              className="w-5 h-5 text-slate-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {isFinished ? (
              <span className="text-sm font-medium text-slate-800">
                {finishedMessage}
              </span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-800">
                  ⏳ Event dimulai dalam:
                </span>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm font-semibold">
                    {String(days).padStart(2, "0")} Hari
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm font-semibold">
                    {String(hours).padStart(2, "0")} Jam
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm font-semibold">
                    {String(minutes).padStart(2, "0")} Menit
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm font-semibold">
                    {String(seconds).padStart(2, "0")} Detik
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: 3D Model */}
      <div className="min-h-[320px] order-1 md:order-2 relative z-30 flex items-center justify-center p-6">
        <div className="w-full max-w-[720px] rounded-xl  p-4 ">
          <ModelViewer
            src="/ui/maskotwelcome.glb"
            width={deviceName === "mobile" ? "90vw" : "600px"}
            height={deviceName === "mobile" ? "40vh" : "450px"}
            cameraOrbit="0deg 80deg 9m"
            cameraTarget="0m 2m 0m"
            alt="Maskot Nusakids"
            isSpeak={isGo}
            cameraControls={false}
          />
        </div>
      </div>

      {/* Decorative light rays (absolutely positioned) */}
      <LightRays />
    </section>
  );
}
