"use client";

// standard

// third party
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// local
const URI_GRAPHQL = process.env.NEXT_PUBLIC_URI_GRAPHQL;

const client = new ApolloClient({
  uri: `${URI_GRAPHQL}`,
  cache: new InMemoryCache({
    typePolicies: {
      GeneInfo: {
        keyFields: ["accessionId"],
      },
      Gene: {
        fields: {
          gene: {
            merge(existing = {}, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  }),
});

export default function WebServiceProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
