import { IMessage, IUser } from "@convostack/models";

export interface IAgent {
  // TODO consider optional support for dynamic primer messages?
  // TODO consider adding an optional stop generating method to cancel a message
  reply(
    context: IAgentContext,
    callbacks?: IAgentCallbacks
  ): Promise<IAgentResponse>;
}

export interface IAgentMetadata {
  displayName: string;
  primer: string;
  avatarUrl?: string;
}

export interface IAgentResponse {
  content: string;
  contentType?: IAgentResponseContentType;
}

export interface IAgentContext {
  getContextArgs(): any;

  getHistory(): IAgentContextHistory;

  getUser(): IAgentContextUser;

  getHumanMessage(): IAgentHumanMessage;
}

export interface IAgentCallbacks {
  onMessagePart(data: IAgentMessagePart);
}

export interface IAgentMessagePart {
  contentChunk: string;
  contentType?: IAgentResponseContentType;
}

export type IAgentResponseContentType = "markdown"
export type IAgentContextUser = IUser; // TODO consider what user props should be accessible
export type IAgentContextHistory = IMessage[]; // TODO use langchain-compatible history?
export type IAgentHumanMessage = IMessage;
