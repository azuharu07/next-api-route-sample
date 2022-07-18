import { createUser } from "./mutations/createUser";
import { sayHello } from "./queries/sayHello";
import { Post, User } from "./fetchers";

export const resolvers = {
  Query: {
    sayHello
  },
  Mutation: {
    createUser
  },
  User,
  Post
};