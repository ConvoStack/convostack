import {
  IAgent,
  IAgentCallbacks,
  IAgentContext,
  IAgentResponse,
} from "@convostack/agent";
import { BaseChain } from "langchain/chains";
import { ChainValues } from "langchain/schema";
import { Callbacks } from "langchain/callbacks";

export class LangchainAgentWrapper<T extends BaseChain> implements IAgent {
  private agentOrChain: T;
  private chainValues: ChainValues;
  private userInputKey: string;
  private callbacks: Callbacks;

  constructor(
    agentOrChain: T,
    chainValues?: ChainValues,
    userInputKey?: string,
    callbacks?: Callbacks
  ) {
    this.agentOrChain = agentOrChain;
    this.chainValues = chainValues;
    this.userInputKey = userInputKey;
    this.callbacks = callbacks;
  }

  async reply(context: IAgentContext): Promise<IAgentResponse> {
    let humanMessage = context.getHumanMessage().content;
    let res;
    if (this.chainValues && this.userInputKey) {
      this.chainValues[this.userInputKey] = humanMessage;
      const response = await this.agentOrChain.call(
        this.chainValues,
        this.callbacks
      );
      res = response.text;
    } else {
      res = await this.agentOrChain.run(humanMessage);
    }
    return {
      content: res,
      contentType: "markdown",
    };
  }
}
