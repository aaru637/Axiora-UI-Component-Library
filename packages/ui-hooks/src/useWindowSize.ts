import { useEffect, useState } from "react";

export interface WindowSize {
  width: number;
  height: number;
}

const defaultSize: WindowSize = { width: 0, height: 0 };

function readWindowSize(): WindowSize {
  if (typeof window === "undefined") {
    return defaultSize;
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(readWindowSize);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleResize = () => {
      setSize(readWindowSize());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
