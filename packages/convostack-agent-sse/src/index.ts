import { IAgent, IAgentCallbacks, IAgentContext, IAgentResponse } from "@convostack/agent";
import { EventSource } from "launchdarkly-eventsource";

export class AgentSSEClient implements IAgent {

  constructor(private sseUrl: string) {
  }

  reply(context: IAgentContext, callbacks: IAgentCallbacks): Promise<IAgentResponse> {
    return new Promise<IAgentResponse>((resolve, reject) => {
      try {
        let pendingContent = "";
        const eventsConn = new EventSource(this.sseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            humanMessage: context.getHumanMessage(),
            history: context.getHistory(),
            contextArgs: context.getContextArgs(),
            user: context.getUser()
          }),
          errorFilter: (e) => {
            // TODO consider working on the retry strategy. For now, this will ensure that no retry logic is ever invoked
            // Note: a typical end `e` will look like `Event { type: 'end' }`
            if (e && e.type !== "end") {
              reject(e);
            }
            return false;
          }
        });
        eventsConn.onerror = (e) => {
          reject(e);
        };
        eventsConn.onend = (e) => {
          // No-op, stream ended
        };
        eventsConn.onclosed = (e) => {
          // No-op, connection closed
        };
        eventsConn.onretrying = (e) => {
          // Currently no-op, but might tie into a future retrying implementation
        };
        eventsConn.onmessage = async (event) => {
          if (event.data === "[DONE]") {
            resolve({
              content: pendingContent
            });
          } else {
            const data = JSON.parse(event.data);
            pendingContent += data.contentChunk;
            callbacks.onMessagePart({
              contentChunk: data.contentChunk
            });
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }
}
