import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { resolvers } from "apollo/server/resolvers";
import { ApolloServer } from "apollo-server-micro"
import { addResolversToSchema } from "@graphql-tools/schema";
import Cors from "micro-cors"

const cors = Cors()

const schema = loadSchemaSync(("src/apollo/server/schema.graphql"), {
  loaders: [new GraphQLFileLoader]
})

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const apolloServer = new ApolloServer({ schema: schemaWithResolvers });

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