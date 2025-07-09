//standard
import { useState, useEffect } from "react";

// third party

//local
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
    // 1) Validar todos los campos
    for (const [value, rules] of validators) {
      const msg = validateField(value, rules);
      if (msg) {
        setError(msg);
        setLoading(false);
        return;
      }
    }

    const { url, options } = getRequestInfo();
    setLoading(true);

    fetch(url, options)
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
          // For other errors we parse the JSON from the API
          const { message } = await res.json();
          throw new Error(message);
        }

        const { result, not_found } = await res.json();

        if (mapperNotFound) {
          setNotFound(not_found ? mapperNotFound(not_found) : null);
        }
        // Success (200)
        return mapperSuccess(result);
      })
      .then((mapped) => setData(mapped))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, deps);

  return { data, notFound, loading, error };
}
