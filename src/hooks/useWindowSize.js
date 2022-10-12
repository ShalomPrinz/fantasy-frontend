import { useEffect, useState } from "react";

function useWindowSize(callback) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      if (callback)
        callback();
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [callback]);
  return size;
}

export default useWindowSize;
