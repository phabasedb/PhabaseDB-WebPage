"use client";

// standard

// third party
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// local

const URI_GRAPHQL = `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_GRAPHQL_PORT}`;

const client = new ApolloClient({
  uri: `${URI_GRAPHQL}/graphql`,
  cache: new InMemoryCache(),
});

export default function WebServiceProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
