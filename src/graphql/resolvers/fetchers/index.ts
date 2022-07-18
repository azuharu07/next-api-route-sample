import { PostResolvers, UserResolvers } from "types/generated-graphql";

export const User: UserResolvers = {
  posts: async (parent, _, context) =>
    context.prisma.post.findMany({
      where: {
        id: parent.id
      }
    })
}

export const Post: PostResolvers = {
  author: async (parent, _, context) => {
    const author = await context.prisma.user.findUnique({
      where: {
        id: parent.authorId
      }
    })

    if (!author) throw new Error("author not found")

    return author
  }
}
