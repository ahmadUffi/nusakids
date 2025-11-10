import { useEffect, useState } from "react";

const getDevice = (width) => {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const useResponsive = () => {
  const [deviceName, setDeviceName] = useState(null); // null dulu
  const [deviceWidth, setDeviceWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setDeviceName(getDevice(window.innerWidth));
      setDeviceWidth(window.innerWidth);
    };

    handleResize(); // Set nilai awal
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { deviceName, deviceWidth };
};

export default useResponsive;
