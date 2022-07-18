import { MutationResolvers } from "types/generated-graphql"

export const createUser: MutationResolvers["createUser"] = (_, { input: { email, name } }, context) => context.prisma.user.create({
  data: {
    email: email,
    name: name,
  }
})