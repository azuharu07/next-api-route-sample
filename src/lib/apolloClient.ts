import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql` || process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
  cache: new InMemoryCache()
})