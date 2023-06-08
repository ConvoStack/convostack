import { playground, PlaygroundAgentProxy } from "convostack/playground";
import { AgentEcho } from "convostack/agent-echo";
import {
  IAgentCallbacks,
  IAgentContext,
  IAgentResponse,
} from "@convostack/agent";

const agent = new AgentEcho();
// One-liner for hosted version
playground(agent);

// playground({
//     reply(context: IAgentContext, callbacks?: IAgentCallbacks): Promise<IAgentResponse> {
//         // Your logic
//     }
// })
// const pap = new PlaygroundAgentProxy(agent);
// pap.setProxyUrl('ws://localhost:8088/agent')
// pap.connect()
