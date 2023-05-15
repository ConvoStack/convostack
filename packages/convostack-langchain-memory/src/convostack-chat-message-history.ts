import {
    AIChatMessage,
    BaseChatMessage,
    BaseListChatMessageHistory,
    ChatMessage,
    HumanChatMessage,
    SystemChatMessage,
} from "langchain/schema";
import {IAgentContextHistory} from "@convostack/agent";
import {AI_ROLE, HUMAN_ROLE} from "@convostack/shared";

export type ConvoStackLangchainChatMessageHistoryInput = {
    history: IAgentContextHistory;
};

export class ConvoStackLangchainChatMessageHistory extends BaseListChatMessageHistory {
    private messages: BaseChatMessage[] = [];

    constructor(fields: ConvoStackLangchainChatMessageHistoryInput) {
        const {history} = fields;
        super();
        this.messages = history.map(m => {
            switch (m.role) {
                case HUMAN_ROLE:
                    return new HumanChatMessage(m.content);
                case AI_ROLE:
                    return new AIChatMessage(m.content);
                // TODO should we add support for these message types?
                // case "system":
                //     return new SystemChatMessage(m.content);
                // case "chat":
                // if (storedMessage.data?.additional_kwargs?.role === undefined) {
                //     throw new Error("Role must be defined for chat messages");
                // }
                // return new ChatMessage(
                //     storedMessage.data.content,
                //     storedMessage.data.additional_kwargs.role
                // );
                default:
                    throw new Error(`Got unexpected message role: ${m.role}`);
            }
        })
    }

    async getMessages(): Promise<BaseChatMessage[]> {
        return this.messages;
    }

    async addMessage(message: BaseChatMessage) {
        console.warn('ConvoStackLangchainChatMessageHistory.addMessage(message) is not supported. This will be reflected in memory, but it will not be persisted to the DB.')
        this.messages.push(message);
    }

    async clear() {
        console.warn('ConvoStackLangchainChatMessageHistory.clear() is not supported. This will be reflected in memory, but it will not be persisted to the DB.')
        this.messages = [];
    }
}