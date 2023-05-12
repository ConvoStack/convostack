import { IAgent, IAgentCallbacks, IAgentContext, IAgentResponse } from "@convostack/agent";

export class AgentEcho implements IAgent {
  async reply(
    context: IAgentContext,
    callbacks?: IAgentCallbacks
  ): Promise<IAgentResponse> {
    let humanMessage = context.getHumanMessage().content;
    if (humanMessage.trim() === "") {
      humanMessage = "WARN: no input provided";
    }
    const wordsWithSpaces = humanMessage.match(/(\S+\s*)/g) || [];

    for (const wordWithSpace of wordsWithSpaces) {
      await this.delay(100);
      callbacks.onMessagePart({
        contentChunk: wordWithSpace,
        contentType: "markdown"
      });
    }

    return {
      content: humanMessage,
      contentType: "markdown"
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
