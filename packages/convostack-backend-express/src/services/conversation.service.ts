import { IConversation, IStorageEngine, IUser } from "@convostack/models";
import { IAgentManager } from "@convostack/agent";

export class ConversationService {
  constructor(
    private storage: IStorageEngine,
    private agents: IAgentManager
  ) {
  }

  async mustFindConversation(
    user: IUser,
    conversationId: string,
  ): Promise<IConversation> {
    let convo: IConversation;
    if (conversationId) {
      convo = await this.storage.findConversation({
        id: conversationId
      });
      if (!convo) {
        throw new Error("Conversation not found");
      }
      if (convo.userId !== user.id) {
        throw new Error("Conversation access forbidden");
      }
    }
    return convo;
  }

  async findOrCreateConversation(
    user: IUser,
    conversationId: string | null | undefined,
    agentKey: string
  ): Promise<IConversation> {
    let convo: IConversation;
    if (conversationId) {
      convo = await this.storage.findConversation({
        id: conversationId
      });
      if (!convo) {
        throw new Error("Conversation not found");
      }
      if (convo.userId !== user.id) {
        throw new Error("Conversation access forbidden");
      }
    } else {
      let primer = "";
      if (!agentKey) {
        agentKey = this.agents.getDefaultAgentKey();
      }
      primer = this.agents.getAgentPrimer(agentKey);
      if (!primer) {
        primer = null;
      }
      convo = await this.storage.createConversation({
        title: this.agents.getAgentDisplayName(agentKey),
        agent: agentKey,
        primer,
        userId: user.id
      });
    }
    return convo;
  }

}
