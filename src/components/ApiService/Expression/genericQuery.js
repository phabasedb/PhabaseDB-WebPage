// standard
import { useState, useEffect } from "react";

// local
import { validateField } from "./utils/field-validation";

/**
 * useApiRequest encapsula validación, fetch, mapeo y estados.
 *
 * @param {Function} getRequestInfo  → () => { url, options }
 * @param {Array}    deps            → Array de dependencias para useEffect
 * @param {Array}    validators      → [ [value, rules], ... ]
 * @param {Function} mapperSuccess   → (json) => mappedData
 * @param {Function} [mapperNotFound]→ (json.not_found) => mappedNotFound
 */
export function useApiRequest(
  getRequestInfo,
  deps,
  validators,
  mapperSuccess,
  mapperNotFound
) {
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Creamos un AbortController para poder cancelar el fetch
    const controller = new AbortController();
    const signal = controller.signal;

    // Reset previous state
    setData(null);
    setNotFound(null);
    setError(null);

    // Validaciones
    for (const [value, rules] of validators) {
      const msg = validateField(value, rules);
      if (msg) {
        setError(msg);
        setLoading(false);
        return () => controller.abort(); // cancelar si ya no hacemos fetch
      }
    }

    const { url, options } = getRequestInfo();
    setLoading(true);

    fetch(url, { ...options, signal })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 502) {
            throw new Error(
              "The Gene Expression service is not available at this time. Please try again later or contact an administrator."
            );
          }
          if (res.status === 504) {
            throw new Error(
              "The request to the Gene Expression service has taken too long and has timed out. Please try again in a few minutes or reduce the size of your IDs or columns."
            );
          }
          const { message } = await res.json();
          throw new Error(message);
        }

        const { result, not_found } = await res.json();

        if (mapperNotFound) {
          setNotFound(not_found ? mapperNotFound(not_found) : null);
        }

        return mapperSuccess(result);
      })
      .then((mapped) => setData(mapped))
      .catch((err) => {
        // Si fue abortado, no hacemos nada
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false);
      });

    // Cleanup al desmontar: cancelamos fetch pendiente
    return () => controller.abort();
  }, deps);

  return { data, notFound, loading, error };
}
