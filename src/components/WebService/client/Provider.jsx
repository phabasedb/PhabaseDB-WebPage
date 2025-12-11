"use client";

// standard

// third party
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// local
let globalClient;

function makeClient() {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI_GRAPHQL,
    cache: new InMemoryCache({
      typePolicies: {
        GeneInfo: { keyFields: ["accessionId"] },
      },
    }),
  });
}

function getClient() {
  if (!globalClient) globalClient = makeClient();
  return globalClient;
}

export default function WebServiceProvider({ children }) {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
