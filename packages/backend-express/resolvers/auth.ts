import { AuthResponse } from "../generated/graphql";
import { Resolvers } from "../generated/graphql";

export const authResolvers: Resolvers = {
  Mutation: {
    async login(_, args, ctx): Promise<AuthResponse> {
      // TODO if the user is already logged in, throw an error
      return await ctx.services.auth.login(ctx.req, args);
    },
    async refreshAuth(_, args, ctx): Promise<AuthResponse> {
      return await ctx.services.auth.refresh(ctx.req, args);
    }
  }
};

