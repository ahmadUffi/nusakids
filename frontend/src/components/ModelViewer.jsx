import { useEffect, useRef } from "react";
import useResponsive from "../hooks/useResponsive";

export default function ModelViewer({
  src = "",
  alt = "3D model",
  width = "100%",
  height = "500px",
  cameraOrbit = "45deg 75deg 0deg",
  cameraTarget = "0m 1m 0m",
  isSpeak = false, // << kontrol animasi dari sini
  animationName = "Armature|mixamo.com|Layer0",
  ar = false,
  autoplay = false,
  cameraControls = true,
}) {
  const modelRef = useRef(null);
  const { deviceName } = useResponsive();

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const handleLoad = () => {
      // Set animasi sesuai prop
      model.animationName = animationName;

      if (isSpeak) {
        model.play();
      } else {
        model.pause();
      }
    };

    // Jalankan saat model load
    model.addEventListener("load", handleLoad);

    return () => {
      model.removeEventListener("load", handleLoad);
    };
  }, [animationName]);

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    // Set animasi aktif terus
    model.animationName = animationName;

    // Play/pause berdasarkan isSpeak
    if (isSpeak) {
      model.play();
    } else {
      model.pause();
    }
  }, [isSpeak, animationName]);

  return (
    <model-viewer
      ref={modelRef}
      src={src}
      alt={alt}
      autoplay={animationName ? true : false}
      loop
      environment-image="neutral"
      camera-controls={cameraControls}
      ar={ar}
      camera-orbit={cameraOrbit}
      camera-target={cameraTarget}
      shadow-intensity="1"
      style={{ width, height }}
    ></model-viewer>
  );
}

// instruction-prompt="none"
