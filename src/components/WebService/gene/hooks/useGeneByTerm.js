// local
import { useQuey } from "../hooks/useQuery";
import { GET_GENE_BY_TERM } from "../queries/getGeneBy";
import { mapGeneSummaries } from "../mappers/geneDataMappers";

export function useGeneByTerm(term, { limit, page }) {
  const { data, loading, error } = useQuey(GET_GENE_BY_TERM, {
    limit,
    page,
    search: term,
    properties: [
      "gene._id",
      "gene.accessionId",
      "gene.name",
      "gene.description",
      "transcripts.accessionId",
    ],
    fullMatchOnly: true,
  });

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (error) {
    return { data: null, loading: false, error };
  }

  const rawData = data?.getGeneBy?.data || [];
  const pagination = data?.getGeneBy?.pagination || null;

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      data: null,
      pagination,
      loading: false,
      error: `No results found for: '${term}'`,
    };
  }

  const mapped = mapGeneSummaries(rawData);

  return {
    data: mapped,
    pagination,
    loading: false,
    error: null,
  };
}
