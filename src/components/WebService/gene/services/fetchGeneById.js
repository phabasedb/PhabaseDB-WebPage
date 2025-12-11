// local
import { useQuey } from "../hooks/useQuery";

export function fetchGeneById(
  geneId,
  query,
  { limit, page, properties, fullMatchOnly },
  mapper
) {
  const { data, loading, error } = useQuey(query, {
    limit,
    page,
    properties,
    search: geneId,
    fullMatchOnly,
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
      error: `No result found for Gen ID: '${geneId}'`,
    };
  }

  const mapped = mapper(rawData[0]);

  return {
    data: mapped,
    pagination,
    loading: false,
    error: null,
  };
}
