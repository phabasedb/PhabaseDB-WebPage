// standard

// third party
import { useRef, useState, useLayoutEffect, useEffect } from "react";

// local

/**
 * Custom hook that returns a `ref` to attach to a container
 * and its `width` in pixels, recalculated:
 *   1) Right after initial layout (useLayoutEffect)
 *   2) On every window resize (useEffect)
 */
export default function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  // Measures the container width and updates state
  const measure = () => {
    if (ref.current) {
      const w = ref.current.getBoundingClientRect().width;
      setWidth(w);
    }
  };

  // Initial measurement after layout
  useLayoutEffect(() => {
    measure();
  }, []);

  // Re-measure on window resize
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { ref, width, measure };
}
