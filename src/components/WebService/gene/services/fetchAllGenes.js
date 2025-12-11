// local
import { useQuey } from "../hooks/useQuery";

export function fetchAllGenes(query, { limit, page }, mapper) {
  const { data, loading, error } = useQuey(query, {
    limit,
    page,
  });

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (error) {
    return { data: null, loading: false, error };
  }

  const rawData = data?.getAllGenes?.data || [];
  const pagination = data?.getAllGenes?.pagination || null;

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      data: [],
      pagination,
      loading: false,
      error: `No genes found in the database`,
    };
  }

  const mapped = mapper(rawData);

  return {
    data: mapped,
    pagination,
    loading: false,
    error: null,
  };
}
