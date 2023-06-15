import { MessageInput } from "../generated/graphql";
import { ConversationEventService } from "./conversation-event.service";
import {
  CONVERSATION_EVENT_KIND_MESSAGE,
  CONVERSATION_EVENT_KIND_MESSAGE_PART
} from "@convostack/shared";
import { IConversation, IMessage, IStorageEngine, IUser } from "@convostack/models";
import {
  IAgentContextHistory,
  IAgentContextUser,
  IAgentHumanMessage,
  IAgentManager,
  IAgentMessagePart
} from "@convostack/agent";

export class AgentService {
  constructor(
    private storage: IStorageEngine,
    private agents: IAgentManager,
    private conversationEventService: ConversationEventService
  ) {
  }

  async subscribeConversationEvents(conversation: IConversation) {
    return this.conversationEventService.subscribeToConversation(conversation);
  }

  sendMessage(
    user: IUser,
    conversation: IConversation,
    message: MessageInput,
    onMessageResponse?: (data: IMessage) => Promise<void>,
    onMessagePartCb?: (data: IAgentMessagePart) => Promise<void>
  ): Promise<IMessage> {
    return new Promise<IMessage>(async (resolve, reject) => {
      try {
        const msg = await this.storage.createMessage({
          turn: (await this.getNextTurnNumber(conversation.id)),
          role: this.agents.getAgentHumanRole(conversation.agent),
          pending: false,
          content: message.content,
          userId: user.id,
          conversationId: conversation.id
        });
        await this.conversationEventService.publishMessage(msg);
        const history = await this.getHistory(msg.conversationId);
        resolve(msg);
        const resp = await this.queryAgent(conversation.agent, conversation, history, user, msg, onMessagePartCb);
        if (onMessageResponse) {
          onMessageResponse(resp)
        }
      } catch (err) {
        reject(err)
      }
    });
  }

  private async getNextTurnNumber(conversationId: string): Promise<number> {
    const lastMessage = await this.storage.findMessages({
      conversationId
    }, {
      turn: "desc"
    }, 0, 1);
    if (!lastMessage || lastMessage.length < 1) {
      return 1;
    }
    return lastMessage[0].turn + 1;
  }

  private async getHistory(conversationId: string, mostRecentFirst: boolean = false, skip: number = 0, take: number = 1000): Promise<IMessage[]> {
    const msgs = await this.storage.findMessages({
      conversationId
    }, {
      turn: mostRecentFirst ? "desc" : "asc"
    }, skip, take);
    if (!msgs) {
      return [];
    }
    return msgs;
  }

  private async queryAgent(agentKey: string, conversation: IConversation, history: IMessage[], user: IUser, message: IMessage, onMessagePartCb?: (data: IAgentMessagePart) => Promise<void>) {
    try {
      // TODO should probably insert this much sooner as a pending message and then update w/ the final response below
      //      this would help to ensure that we lock in the proper message sequence and have a placeholder in the history.
      //      However, if we do that, how do we cancel the messages if the user stops generation or there is an error?
      const ces = this.conversationEventService;
      const agentResponse = await this.agents.getAgent(agentKey).reply({
        getContextArgs(): any {
          return conversation.context ? JSON.parse(conversation.context) : {};
        },
        getHistory(): IAgentContextHistory {
          return history;
        },
        getUser(): IAgentContextUser {
          return user;
        },
        getHumanMessage(): IAgentHumanMessage {
          return message;
        }
      }, {
        onMessagePart(data: IAgentMessagePart) {
          if (onMessagePartCb) {
            onMessagePartCb(data)
          }
          ces.publishConversationEvent(
            message.conversationId,
            {
              kind: CONVERSATION_EVENT_KIND_MESSAGE_PART,
              payload: {
                chunk: data.contentChunk
              }
            },
            true
          );
        }
      });
      // TODO what to do with contentType?
      const respMessage = await this.storage.createMessage({
        content: agentResponse.content,
        conversationId: message.conversationId,
        pending: false,
        role: this.agents.getAgentAIRole(agentKey),
        turn: (await this.getNextTurnNumber(message.conversationId))
      });
      await this.conversationEventService.publishConversationEvent(
        message.conversationId,
        {
          kind: CONVERSATION_EVENT_KIND_MESSAGE,
          payload: respMessage
        },
        false
      );
      return respMessage
    } catch (error: any) {
      console.log("agent llm error", error);
      throw new Error(error);
    }
  }
}
