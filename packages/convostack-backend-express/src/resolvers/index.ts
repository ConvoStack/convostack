import { authResolvers } from "./auth";
import { conversationResolvers } from "./conversations";
import { Resolvers } from "../generated/graphql";

// TODO clean up this hacky import approach
const resolvers: Resolvers = {
  Mutation: {
    ...authResolvers.Mutation,
    ...conversationResolvers.Mutation,
  },
  Query: {
    ...authResolvers.Query,
    ...conversationResolvers.Query,
  },
  Subscription: {
    ...authResolvers.Subscription,
    ...conversationResolvers.Subscription,
  }
};

export default resolvers;
