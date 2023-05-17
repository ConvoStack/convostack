import { SendMessageResponse, Conversation, Message, ConversationListItem } from "../generated/graphql";
import { Resolvers } from "../generated/graphql";
import { mustUser } from "../guards/index";

export const conversationResolvers: Resolvers = {
  Mutation: {
    async sendMessage(_, { message, conversationId, agent, context }, ctx): Promise<SendMessageResponse> {
      mustUser(ctx);
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
      const msg = await ctx.services.agentService.sendMessage(ctx.user, convo, message);
      return {
        conversationId: convo.id,
        messageId: msg.id
      };
    },
    async updateConversationContext(_, { conversationId, context }, ctx): Promise<Conversation> {
      mustUser(ctx);
      let convo = await ctx.services.conversationService.mustFindConversation(
        ctx.user,
        conversationId
      );
      convo = await ctx.services.storage.updateConversation(convo.id, {
        context: JSON.stringify(context)
      });
      return {
        ...convo,
        createdAt: convo.createdAt.toISOString(),
        updatedAt: convo.updatedAt.toISOString()
      };
    }
  },
  Query: {
    async getConversations(_, __, ctx): Promise<ConversationListItem[]> {
      mustUser(ctx);
      const convos = await ctx.services.storage.findConversations(
        {
          userId: ctx.user.id
        },
        {
          updatedAt: "desc"
        }
      );
      // TODO optimize into a single query
      return await Promise.all(convos.map(async (convo) => {
        const lastMessages = await ctx.services.storage.findMessages(
          {
            conversationId: convo.id
          },
          {
            turn: "desc"
          }, 0, 1
        );
        let lastMessage: Message = null;
        if (lastMessages && lastMessages.length > 0) {
          lastMessage = {
            ...lastMessages[0],
            createdAt: lastMessages[0].createdAt.toISOString(),
            updatedAt: lastMessages[0].updatedAt.toISOString()
          };
        }
        return {
          ...convo,
          agent: {
            key: convo.agent,
            displayName: ctx.services.agents.getAgentDisplayName(convo.agent),
            avatarUrl: ctx.services.agents.getAgentAvatarUrl(convo.agent)
          },
          createdAt: convo.createdAt.toISOString(),
          updatedAt: convo.updatedAt.toISOString(),
          lastMessage
        };
      })).then(conversations => {
        return conversations.sort((a, b) => {
          const aLastMessageTime = a.lastMessage ? new Date(a.lastMessage.updatedAt).getTime() : new Date(a.updatedAt).getTime();
          const bLastMessageTime = b.lastMessage ? new Date(b.lastMessage.updatedAt).getTime() : new Date(b.updatedAt).getTime();

          // Sorting in descending order. For ascending order swap `bLastMessageTime - aLastMessageTime`
          return bLastMessageTime - aLastMessageTime;
        });
      });
    }
  },
  Subscription: {
    subscribeConversationEvents: {
      subscribe: async function* (_, { conversationId, agent, context }, ctx) {
        mustUser(ctx);
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

        // TODO clean up the extra iterator and in-line this routine
        let iterator = await ctx.services.agentService.subscribeConversationEvents(convo);
        while (true) {
          const { value, done } = await iterator.next();
          if (!done) {
            yield value;
          } else {
            break;
          }
        }
      }
    }
  }
};

