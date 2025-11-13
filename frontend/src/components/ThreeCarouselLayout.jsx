import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ModelViewer from "./ModelViewer";
import useResponsive from "..//hooks/useResponsive";

export default function ThreeCarouselLayout() {
  const { deviceName } = useResponsive();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      title: "Model Information",
      desc: "Lihat detail model 3D secara interaktif dengan rotasi dan zoom.",
    },
    {
      title: "Material Preview",
      desc: "Tampilkan variasi tekstur atau material dari model 3D.",
    },
    {
      title: "Environment Settings",
      desc: "Ubah pencahayaan, background, atau efek refleksi secara real-time.",
    },
  ];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    );
  }, [emblaApi]);

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="w-full  bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* LEFT - Model Viewer */}
        <div className="md:w-1/2 w-full flex justify-center">
          <ModelViewer
            src="/ui/maskotwelcome.glb"
            width={deviceName === "mobile" ? "90vw" : "600px"}
            height={deviceName === "mobile" ? "40vh" : "450px"}
            cameraOrbit="0deg 80deg 9m"
            cameraTarget="0m 2m 0m"
            alt="Maskot Nusakids"
            cameraControls={false}
          />
        </div>

        {/* RIGHT - Carousel */}
        <div className="md:w-1/2 w-full flex flex-col items-center relative">
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="embla__container flex gap-4">
              {slides.map((slide, index) => (
                <div
                  className="embla__slide min-w-[80%] sm:min-w-[70%] md:min-w-[60%] flex-shrink-0 transition-transform duration-500"
                  key={index}
                >
                  <div
                    className={`p-6 bg-gray-50 border rounded-2xl shadow-md text-center transition-all duration-500 ${
                      selectedIndex === index
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-70 blur-[1px]"
                    }`}
                  >
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center w-full max-w-sm mt-4">
            <button
              onClick={scrollPrev}
              className="p-2 bg-white border rounded-full shadow hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === selectedIndex ? "bg-gray-800" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="p-2 bg-white border rounded-full shadow hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
