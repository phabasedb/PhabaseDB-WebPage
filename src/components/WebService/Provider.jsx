"use client";

// standard

// third party
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

// local

const client = new ApolloClient({
  uri: "http://192.168.0.14:4000/graphql",
  cache: new InMemoryCache(),
});

export default function WebServiceProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
