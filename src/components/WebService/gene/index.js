//standard

// third party

//local
import { fetchAllGenes } from "./services/fetchAllGenes";
import { fetchGeneByTerm } from "./services/fetchGeneByTerm";
import { fetchGeneById } from "./services/fetchGeneById";
import { GET_GENE_ALL } from "./queries/getAllGenes";
import { GET_GENE_BY_TERM, GET_GENE_BY_ID } from "./queries/getGeneBy";
import { mapGeneSummaries, mapGeneDetail } from "./mappers/geneDataMappers";

export function useAllGenes({ limit, page }) {
  return fetchAllGenes(GET_GENE_ALL, { limit, page }, mapGeneSummaries);
}

export function useGeneByTerm(term, { limit, page }) {
  return fetchGeneByTerm(
    term,
    GET_GENE_BY_TERM,
    {
      limit,
      page,
      properties: [
        "gene._id",
        "gene.accessionId",
        "gene.name",
        "gene.description",
        "transcripts.accessionId",
      ],
      fullMatchOnly: true,
    },
    mapGeneSummaries
  );
}

export function useGeneById(geneId) {
  return fetchGeneById(
    geneId,
    GET_GENE_BY_ID,
    {
      limit: 1,
      page: 0,
      properties: ["gene._id", "gene.accessionId"],
      fullMatchOnly: true,
    },
    mapGeneDetail
  );
}
