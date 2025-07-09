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

    // 1) Basic validations
    if (!query.trim()) {
      setError("The sequence cannot be empty.");
      setLoading(false);
      return;
    }
    if (selected.length === 0) {
      setError("You must select at least one database.");
      setLoading(false);
      return;
    }

    // 2) Advanced validations
    const evErr = validateEvalue(evalue);
    const wsErr = validateWordSize(wordSize);
    const mtErr = validateMaxTargetSeqs(maxTargetSeqs);
    const firstErr = evErr || wsErr || mtErr;
    if (firstErr) {
      setError(firstErr);
      setLoading(false);
      return;
    }

    // 3) Construction of advanced parameters
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
        if (res.status === 502) {
          throw new Error(
            "The BLAST service is not available at this time. Please try again later or contact an administrator."
          );
        }
        if (res.status === 504) {
          throw new Error(
            "The request to the BLAST service has taken too long and has timed out. Please try again in a few minutes or reduce the size of your query and check parameters."
          );
        }
        // For other errors we parse the JSON from the API
        const { message } = await res.json();
        throw new Error(message);
      }

      // Success (200): waiting for pure HTML
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
