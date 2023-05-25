import { IConvoStackBackendConfiguration } from "../backend";
import { IStorageEngine } from "@convostack/models";
import { AgentService } from "./agent.service";
import { ConversationService } from "./conversation.service";
import { ConversationEventService } from "./conversation-event.service";
import { IAuthProvider } from "@convostack/auth";
import { IAgentManager } from "@convostack/agent";
import * as express from "express";
import {IGQLAuthContext} from "@convostack/models/src";

export interface IGQLContext extends IGQLAuthContext {
  services: ConvoStackServices;
  req?: express.Request
  connectionParams?: Readonly<Record<string, unknown>>
}

export class ConvoStackServices {
  public conversationEventService: ConversationEventService;
  public agentService: AgentService;
  public conversationService: ConversationService;
  public auth: IAuthProvider;
  public storage: IStorageEngine;
  public agents: IAgentManager;

  constructor(private config: IConvoStackBackendConfiguration) {
    this.auth = config.auth;
    this.storage = config.storage;
    this.agents = config.agents;
    this.conversationEventService = new ConversationEventService(this.storage, this.config.conversationEventServiceOptions);
    this.agentService = new AgentService(this.storage, this.config.agents, this.conversationEventService);
    this.conversationService = new ConversationService(this.storage, this.config.agents);

  }

}