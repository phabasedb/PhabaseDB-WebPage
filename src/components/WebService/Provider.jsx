"use client";

// standard

// third party
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// local
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const graphqlUrl = `${baseUrl}${process.env.NEXT_PUBLIC_GRAPHQL_PORT}`;

const client = new ApolloClient({
  uri: `${graphqlUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default function WebServiceProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
