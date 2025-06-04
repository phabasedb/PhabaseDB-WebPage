//standard

// third party
import { useQuery } from "@apollo/client";

//local
import { GET_GENE_BY_DATATABLE, GET_GENE_BY_ID } from "./getGeneBy";
import { GET_GENE_ALL_DATATABLE } from "./getGeneAll";
import { mapGeneSummaries, mapGeneDetail } from "./utils/gene/geneDataMappers";
import { VALID_SEARCH } from "shared/const-validateds";

/**
 * Generic hook for gene queries with Apollo.
 * @param {string} searchTerm - Search term or ID
 * @param {object} query - Apollo query
 * @param {object} variables - Variables for the query
 * @param {function} mapData - Function for mapping the data
 */
export function useGeneQuery(searchTerm, query, variables, mapData) {
  for (const validator of VALID_SEARCH) {
    if (!validator.test(searchTerm)) {
      return {
        data: null,
        loading: false,
        error: validator.message,
      };
    }
  }

  // Execute the query with Apollo
  const {
    data,
    loading,
    error: apolloError,
  } = useQuery(query, {
    variables,
    skip: !searchTerm,
  });

  // Handle loading state
  if (loading) {
    return { data: null, loading: true, error: null };
  }

  // Handle network error
  if (apolloError?.networkError) {
    console.error("Network error:", apolloError.networkError);
    return {
      data: null,
      loading: false,
      error: "Service not available. Please try again later.",
    };
  }

  // Handling GraphQL errors
  if (apolloError?.graphQLErrors) {
    console.error("GraphQL errors:", apolloError.graphQLErrors);
    return {
      data: null,
      loading: false,
      error: "Error en la consulta del servidor. Por favor, intente de nuevo.",
    };
  }

  // Map data if they exist
  const mappedData = data?.getGeneBy?.data
    ? mapData(data.getGeneBy.data)
    : null;

  // Error-free default return
  return {
    data: mappedData,
    loading: false,
    error: null,
  };
}

// -------------------

/**
 * Hook to search for genes and get an array of summaries.
 * @param {string} query - Alphanumeric search term
 */
export function useGeneSearch(query) {
  return useGeneQuery(
    query,
    GET_GENE_BY_DATATABLE,
    {
      search: query,
      properties: ["gene._id", "gene.accessionId", "gene.description"],
      fullMatchOnly: true,
    },
    (data) => mapGeneSummaries(data)
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
      search: geneId,
      properties: ["gene._id", "gene.accessionId"],
      fullMatchOnly: true,
    },
    (data) => (data[0] ? mapGeneDetail(data[0]) : null)
  );
}

/** Hook nuevo: trae *todos* los genes */
export function useAllGenes() {
  const {
    data,
    loading,
    error: apolloError,
  } = useQuery(GET_GENE_ALL_DATATABLE);

  if (loading) return { data: null, loading: true, error: null };
  if (apolloError) {
    console.error(apolloError);
    return { data: null, loading: false, error: "Error fetching all genes." };
  }

  const mappedData = data?.getAllGenes?.data
    ? mapGeneSummaries(data.getAllGenes.data)
    : null;

  return { data: mappedData, loading: false, error: null };
}
