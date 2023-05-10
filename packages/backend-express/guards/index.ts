import { IGQLContext } from "models";

export const mustUser = (ctx: IGQLContext) => {
  if (!ctx || !ctx.user || !ctx.user.id) {
    throw new Error("Access denied. This route requires authentication.");
  }
};