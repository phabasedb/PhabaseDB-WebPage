import { useState } from "react";
import {
  validateEvalue,
  validateWordSize,
  validateMaxTargetSeqs,
} from "./validators";

export function useBlast({
  type,
  selected,
  query,
  evalue,
  wordSize,
  maxTargetSeqs,
  filterQuery,
  allowGaps,
  matrix,
}) {
  const [htmlResult, setHtmlResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBlast = async () => {
    setLoading(true);
    setError(null);
    setHtmlResult("");

    // 1) Validaciones básicas
    if (!query.trim()) {
      setError("La secuencia no puede estar vacía.");
      setLoading(false);
      return;
    }
    if (selected.length === 0) {
      setError("Debes seleccionar al menos una base de datos.");
      setLoading(false);
      return;
    }

    // 2) Validaciones avanzadas
    const evErr = validateEvalue(evalue);
    const wsErr = validateWordSize(wordSize);
    const mtErr = validateMaxTargetSeqs(maxTargetSeqs);
    const firstErr = evErr || wsErr || mtErr;
    if (firstErr) {
      setError(firstErr);
      setLoading(false);
      return;
    }

    // 3) Construcción de parámetros avanzados
    const args = [];
    evalue.trim() && args.push("-evalue", evalue.trim());
    wordSize.trim() && args.push("-word_size", wordSize.trim());
    maxTargetSeqs.trim() && args.push("-max_target_seqs", maxTargetSeqs.trim());
    !allowGaps && args.push("-ungapped");
    args.push(
      type === "nucleotide" ? "-dust" : "-seg",
      filterQuery ? "yes" : "no"
    );
    type === "protein" && matrix && args.push("-matrix", matrix);

    const advancedParams = args.join(" ");
    const uri =
      type === "nucleotide"
        ? process.env.NEXT_PUBLIC_URI_BLASTN
        : process.env.NEXT_PUBLIC_URI_BLASTP;

    try {
      const res = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sequence: query,
          db: selected,
          params: advancedParams,
        }),
      });

      if (!res.ok) {
        let msg = `Error HTTP ${res.status}`;
        try {
          msg = (await res.json()).message || msg;
        } catch {}
        throw new Error(msg);
      }

      const ctype = res.headers.get("content-type") || "";
      if (ctype.includes("application/json")) {
        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);
        setHtmlResult(data.html || "");
      } else if (ctype.includes("text/html")) {
        setHtmlResult(await res.text());
      } else {
        throw new Error("Tipo de respuesta inesperado: " + ctype);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleBlast, loading, error, htmlResult };
}
