// local
import { useQuey } from "../hooks/useQuery";
import { GET_GENE_BY_ID } from "../queries/getGeneBy";
import { mapGeneDetail } from "../mappers/geneDataMappers";

export function useGeneById(geneId) {
  const { data, loading, error } = useQuey(GET_GENE_BY_ID, {
    limit: 1,
    page: 0,
    search: geneId,
    properties: ["gene._id", "gene.accessionId"],
    fullMatchOnly: true,
  });

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (error) {
    return { data: null, loading: false, error };
  }

  const rawData = data?.getGeneBy?.data || [];

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      data: null,
      loading: false,
      error: `No result found for Gen ID: '${geneId}'`,
    };
  }

  const mapped = mapGeneDetail(rawData[0]);

  return {
    data: mapped,
    loading: false,
    error: null,
  };
}
