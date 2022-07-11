import { resolvers } from "graphql/resolvers";
import { ApolloServer } from "apollo-server-micro"
import Cors from "micro-cors"
import typeDefs from "graphql/schema.graphql"
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const cors = Cors()

const isDevelopment = process.env.NODE_ENV === "development"
const apolloServer = new ApolloServer({
  typeDefs, resolvers, introspection: isDevelopment, plugins: [
    isDevelopment ? ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled()
  ]
});

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({
    path: "/api/graphql"
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false
  }
}