import { useState } from "react";

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
  const [loading, setLoading] = useState(false); // Corregido: valor inicial debe ser booleano
  const [error, setError] = useState(null);

  const isInteger = (s) => /^-?\d+$/.test(s);
  const isFloat = (s) => /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(s);

  const handleBlast = async () => {
    setLoading(true);
    setError(null);
    setHtmlResult("");

    // Validaciones
    const cleanedEvalue = evalue.trim();
    if (cleanedEvalue !== "") {
      if (!isFloat(cleanedEvalue)) {
        setError("E‑value must be a valid number (e.g. 0.001 or 1e-5).");
        setLoading(false);
        return;
      }
      if (parseFloat(cleanedEvalue) <= 0) {
        setError("E‑value must be greater than 0.");
        setLoading(false);
        return;
      }
    }

    if (wordSize && wordSize.trim() !== "") {
      if (!isInteger(wordSize) || parseInt(wordSize, 10) <= 0) {
        setError("Word size must be a positive integer.");
        setLoading(false);
        return;
      }
    }

    if (maxTargetSeqs && maxTargetSeqs.trim() !== "") {
      if (!isInteger(maxTargetSeqs) || parseInt(maxTargetSeqs, 10) <= 0) {
        setError("# of alignments must be a positive integer.");
        setLoading(false);
        return;
      }
    }

    // Montaje de flags
    const args = [];
    if (cleanedEvalue !== "") args.push("-evalue", cleanedEvalue);
    if (wordSize.trim() !== "") args.push("-word_size", wordSize);
    if (maxTargetSeqs.trim() !== "")
      args.push("-max_target_seqs", maxTargetSeqs);
    if (!allowGaps) args.push("-ungapped");
    if (type === "nucleotide") {
      args.push("-dust", filterQuery ? "yes" : "no");
    } else {
      args.push("-seg", filterQuery ? "yes" : "no");
    }
    if (type === "protein" && matrix) args.push("-matrix", matrix);

    const advancedParams = args.join(" ");

    // Llamada a la API
    const uri =
      type === "nucleotide"
        ? process.env.NEXT_PUBLIC_URI_BLASTN
        : process.env.NEXT_PUBLIC_URI_BLASTP;

    try {
      // Logs para depuración
      console.log("URI:", uri);
      console.log("Datos enviados:", {
        sequence: query,
        db: selected,
        params: advancedParams,
      });

      const res = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sequence: query,
          db: selected,
          params: advancedParams,
        }),
      });

      if (res.status >= 500) {
        throw new Error("Network error, please try again later.");
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error in BLAST");
      }
      const html = await res.text();
      setHtmlResult(html);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleBlast, loading, error, htmlResult };
}
