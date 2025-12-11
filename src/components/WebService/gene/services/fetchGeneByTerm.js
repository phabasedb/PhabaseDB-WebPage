// local
import { useQuey } from "../hooks/useQuery";

export function fetchGeneByTerm(
  term,
  query,
  { limit, page, properties, fullMatchOnly },
  mapper
) {
  const { data, loading, error } = useQuey(query, {
    limit,
    page,
    properties,
    search: term,
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
      error: `No results found for: '${term}'`,
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
