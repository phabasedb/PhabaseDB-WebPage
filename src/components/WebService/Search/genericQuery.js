//standard

//third party
import { useQuery } from "@apollo/client";

//local

/**
 * Auxiliary hook that encapsulates the execution of an Apollo query,
 * loading, networkError, graphQLErrors and data mapping handling.
 *
 * @param {DocumentNode} query - The Apollo query.
 * @param {object} variables - Variables for the query.
 * @param {function} extractData - Function that extracts the list of data from response.data
 * @param {function} mapData - Function for transforming the data
 */
export function useWrappedQuery(query, variables, extractData, mapData) {
  const {
    data,
    loading,
    error: apolloError,
  } = useQuery(query, {
    variables,
    skip: variables?.search === "" || false,
  });

  if (loading) {
    return { data: null, loading: true, error: null };
  }

  if (apolloError?.networkError) {
    console.error("Network error:", apolloError.networkError);
    return {
      data: null,
      loading: false,
      error: "Service not available. Please try again later.",
    };
  }

  if (apolloError?.graphQLErrors?.length) {
    console.error("GraphQL errors:", apolloError.graphQLErrors);
    return {
      data: null,
      loading: false,
      error: "Error in server query. Please try again.",
    };
  }

  const raw = extractData(data);
  const mapped = raw ? mapData(raw) : null;

  return { data: mapped, loading: false, error: null };
}
