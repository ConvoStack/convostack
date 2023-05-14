import {
    AIChatMessage,
    BaseChatMessage,
    BaseListChatMessageHistory,
    ChatMessage,
    HumanChatMessage,
    SystemChatMessage,
} from "langchain/schema";
import {IAgentContextHistory} from "@convostack/agent";

export type ConvostackLangchainChatMessageHistoryInput = {
    history: IAgentContextHistory;
    aiRole: string;
    humanRole: string;
};

export class ConvoStackLangchainChatMessageHistory extends BaseListChatMessageHistory {
    private messages: BaseChatMessage[] = [];

    constructor(fields: ConvostackLangchainChatMessageHistoryInput) {
        const {history, aiRole, humanRole} = fields;
        super();
        this.messages = history.map(m => {
            switch (m.role) {
                case humanRole:
                    return new HumanChatMessage(m.content);
                case aiRole:
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