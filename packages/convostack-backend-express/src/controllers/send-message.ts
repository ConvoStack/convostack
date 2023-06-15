import * as express from "express";
import {mustUser} from "../guards";
import {IGQLContext} from "../services";
import {IMessage} from "@convostack/models";
import {IAgentMessagePart} from "@convostack/agent";

export const sendMessageController = async (req: express.Request, res: express.Response, ctx: IGQLContext) => {
    mustUser(ctx);
    const {message, conversationId, agent, context} = req.body;
    let convo = await ctx.services.conversationService.findOrCreateConversation(
        ctx.user,
        conversationId,
        agent
    );
    if (context) {
        convo = await ctx.services.storage.updateConversation(convo.id, {
            context: JSON.stringify(context)
        });
    }
    await ctx.services.agentService.sendMessage(ctx.user, convo, message, async (data: IMessage) => {
        res.write(JSON.stringify(data) + '\n')
        res.end()
    }, async (part: IAgentMessagePart) => {
        res.write(JSON.stringify(part) + '\n')
    });
}