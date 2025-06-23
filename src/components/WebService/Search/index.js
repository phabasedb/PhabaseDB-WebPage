//standard

// third party

//local
import { VALID_SEARCH } from "shared/const-validateds";
import { useWrappedQuery } from "./genericQuery";
import { GET_GENE_BY_DATATABLE, GET_GENE_BY_ID } from "./getGeneBy";
import { GET_GENE_ALL_DATATABLE } from "./getGeneAll";
import { mapGeneSummaries, mapGeneDetail } from "./utils/gene/geneDataMappers";

/**
 * Generic hook for gene queries with Apollo.
 * @param {string} searchTerm - Search term or ID
 * @param {object} query - Apollo query
 * @param {object} variables - Variables for the query
 * @param {function} mapData - Function for mapping the data
 */
export function useGeneQuery(searchTerm, query, variables, mapData) {
  // Pre-validation
  for (const v of VALID_SEARCH) {
    if (!v.test(searchTerm)) {
      return { data: null, loading: false, error: v.message };
    }
  }

  return useWrappedQuery(
    query,
    { ...variables, search: searchTerm },
    (data) => data.getGeneBy?.data,
    mapData
  );
}

// -------------------

/**
 * Hook to search for genes and get an array of summaries.
 * @param {string} term - Alphanumeric search term
 */
export function useGeneSearch(term) {
  return useGeneQuery(
    term,
    GET_GENE_BY_DATATABLE,
    {
      properties: [
        "gene._id",
        "gene.accessionId",
        "gene.description",
        "transcripts.accessionId",
      ],
      fullMatchOnly: true,
    },
    mapGeneSummaries
  );
}

/**
 * Hook to get the full detail of a gene by its ID or accession.
 * @param {string} geneId - ID or accession of the gene
 */
export function useGeneById(geneId) {
  return useGeneQuery(
    geneId,
    GET_GENE_BY_ID,
    {
      properties: ["gene._id", "gene.accessionId"],
      fullMatchOnly: true,
    },
    (data) => mapGeneDetail(data[0])
  );
}

/** Hook that brings all the genes */
export function useAllGenes() {
  return useWrappedQuery(
    GET_GENE_ALL_DATATABLE,
    null,
    (data) => data.getAllGenes?.data,
    mapGeneSummaries
  );
}
