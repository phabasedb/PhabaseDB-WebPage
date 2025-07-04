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
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.status !== "success") {
          throw new Error(json.message || "API Error");
        }
        // 2) not_found opcional
        if (mapperNotFound) {
          setNotFound(json.not_found ? mapperNotFound(json.not_found) : null);
        }
        // 3) mapear resultado
        return mapperSuccess(json.result);
      })
      .then((mapped) => setData(mapped))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, deps);

  return { data, notFound, loading, error };
}
