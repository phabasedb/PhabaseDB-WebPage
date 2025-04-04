// standard

// third party
import { useQuery } from "@apollo/client";

// local
import {
  formatGraphQLDataTable,
  formatGraphQLAccessionId,
} from "./utils/gene/processSearchData";
import { GET_GENE_BY_DATATABLE, GET_GENE_BY_ACCESSONID } from "./getGeneBy";

const allowedRegex = /^[A-Za-z0-9]+$/;

export function useGetSearchResults(searchTerm) {
  if (!allowedRegex.test(searchTerm)) {
    return {
      formattedData: null,
      loading: false,
      error: "Invalid search term.",
    };
  }

  const { data, loading, error } = useQuery(GET_GENE_BY_DATATABLE, {
    variables: { search: searchTerm },
    skip: !searchTerm,
  });

  let formattedData;
  if (data?.getGeneBy?.data) {
    formattedData = formatGraphQLDataTable(data.getGeneBy.data);
  }

  if (error) {
    console.error("Error en useGetSearchResults: ", error);
    console.error("Query utilizado", GET_GENE_BY_DATATABLE);
  }

  return { formattedData, loading, error };
}

export function useGetSearchResultIdGene(idGene) {
  if (!allowedRegex.test(idGene)) {
    return {
      formattedData: null,
      loading: false,
      error: "Invalid gene search term.",
    };
  }
  const { data, loading, error } = useQuery(GET_GENE_BY_ACCESSONID, {
    variables: {
      search: idGene,
      properties: ["gene._id", "gene.accessionId"],
      fullMatchOnly: true,
    },
    skip: !idGene,
  });

  let formattedData;
  if (data?.getGeneBy?.data) {
    formattedData = formatGraphQLAccessionId(data.getGeneBy.data);
  }

  if (error) {
    console.error("Error en useGetSearchResultGeneId: ", error);
    console.error("Query utilizado", GET_GENE_BY_ACCESSONID);
  }

  return { formattedData, loading, error };
}
