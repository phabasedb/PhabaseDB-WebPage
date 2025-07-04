// shared/expression/utils/container-width.js

import { useRef, useState, useLayoutEffect, useEffect } from "react";

/**
 * Hook que devuelve un `ref` para adjuntar al contenedor
 * y su ancho en px (`width`), recalculado:
 *   1) Justo después del layout inicial (useLayoutEffect).
 *   2) En cada resize de ventana (useEffect).
 */
export default function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  const measure = () => {
    if (ref.current) {
      const w = ref.current.getBoundingClientRect().width;
      setWidth(w);
      console.log("useContainerWidth (measure):", w);
    }
  };

  // Medición inicial justo después del layout
  useLayoutEffect(() => {
    measure();
  }, []);

  // Re-medir en cada resize de ventana
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { ref, width, measure };
}
