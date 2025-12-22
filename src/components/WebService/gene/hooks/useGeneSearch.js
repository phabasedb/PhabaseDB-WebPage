//local
import { useAllGenes } from "./useAllGenes";
import { useGeneByTerm } from "./useGeneByTerm";

export function useGeneSearch(term, { limit, page }) {
  const trimmedTerm = term?.trim();
  const normalizedTerm = trimmedTerm?.toUpperCase();

  if (normalizedTerm === "GENES") {
    return useAllGenes({ limit, page });
  }

  return useGeneByTerm(trimmedTerm, { limit, page });
}
