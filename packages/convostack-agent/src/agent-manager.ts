import { IAgent, IAgentMetadata } from "./agent";
import {AI_ROLE, HUMAN_ROLE} from "@convostack/shared";

export interface IAgentManager {
  getDefaultAgent(): IAgent;

  getDefaultAgentKey(): string;

  getAgent(key: string): IAgent;

  getAgentPrimer(key: string): string;

  getAgentDisplayName(key: string): string;

  getAgentAvatarUrl(key: string): string | null | undefined;

  getAgentHumanRole(key: string): string;

  getAgentAIRole(key: string): string;

  listAvailableAgents(): string[];
}

export interface IDefaultAgentManagerAgentsConfig {
  agent: IAgent,
  metadata: IAgentMetadata
}

export class DefaultAgentManager implements IAgentManager {
  private agents: {
    [key: string]: IDefaultAgentManagerAgentsConfig
  };
  private defaultAgentKey: string;

  constructor(agents: {
    [key: string]: IDefaultAgentManagerAgentsConfig
  }, defaultAgentKey: string) {
    if (Object.keys(agents).length === 0) {
      throw new Error("No agents provided");
    }
    if (!defaultAgentKey || !agents[defaultAgentKey]) {
      throw new Error(`Default agent key '${defaultAgentKey}' is not provided or not found in available agents`);
    }
    for (const key in agents) {
      if (!key) {
        throw new Error("Agent key cannot be an empty string");
      }
    }
    this.agents = agents;
    this.defaultAgentKey = defaultAgentKey;
  }

  getDefaultAgentKey(): string {
    return this.defaultAgentKey;
  }

  getDefaultAgent(): IAgent {
    return this.agents[this.defaultAgentKey].agent;
  }

  getAgent(key: string): IAgent {
    const agent = this.agents[key];
    if (!agent) {
      throw new Error(`Agent with key '${key}' not found`);
    }
    return agent.agent;
  }

  getAgentDisplayName(key: string): string {
    return this.agents[key].metadata.displayName;
  }

  getAgentPrimer(key: string): string {
    return this.agents[key].metadata.primer;
  }

  getAgentHumanRole(key: string): string {
    // TODO consider allowing customization of the Human role string
    return HUMAN_ROLE;
  }

  getAgentAIRole(key: string): string {
    // TODO consider allowing customization of the AI role string
    return AI_ROLE;
  }

  listAvailableAgents(): string[] {
    return Object.keys(this.agents);
  }

  getAgentAvatarUrl(key: string): string | null {
    return this.agents[key].metadata.avatarUrl;
  }
}