import { useEffect, useState } from "react";

import useThrottle from "./useThrottle";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = useThrottle(() => setWidth(window.innerWidth), 100);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  return width;
}

export default useWindowWidth;
