---
sidebar_position: 0.2
---

# Chat Agents: Connecting LLMs, Chatbots, and Langchain

Chatbot implementations in ConvoStack are referred to as "agents." You will likely spend most of your ConvoStack-related
development effort on your agent(s), while ConvoStack handles running your chatbot in production, managing
conversations, and providing the chat UI that your users will use to interface with your agent.

In ConvoStack, agents are encapsulated as implementations of the `IAgent` interface. This allows developers to create
customizable chat agents capable of serving diverse conversational needs. It also ensures that you are not limited by
the framework -- you are completely free to decide the implementation details of your agent. ConvoStack only requires
that you implement a single function that ultimately returns a message to the user when prompted.

## Creating Your Own Agent (the IAgent interface)

Creating your own agent in ConvoStack involves implementing the `IAgent` interface. This interface requires the `reply`
method, which expects two arguments—an `IAgentContext` and `IAgentCallbacks`, and it returns
a `Promise<IAgentResponse>`.

To demonstrate, consider the following minimum-viable example of a custom agent that will always respond with
"This is my response" to users:

```typescript
import {
  IAgent,
  IAgentCallbacks,
  IAgentContext,
  IAgentResponse,
} from "convostack/agent";

export class MyAgent implements IAgent {
  async reply(
    context: IAgentContext,
    callbacks?: IAgentCallbacks
  ): Promise<IAgentResponse> {
    // Process the context and callbacks to generate a response
    return {
      content: "This is my response",
    };
  }
}
```

## Implementing Streaming with Callbacks

The `IAgentCallbacks` interface provides the `onMessagePart` function that enables streaming. By using this callback
function, agents can provide a more interactive experience by sending chunks of the message as they are generated.

Find a simplified streaming example below:

```typescript
import {
  IAgent,
  IAgentCallbacks,
  IAgentContext,
  IAgentResponse,
} from "convostack/agent";

export class MyAgent implements IAgent {
  async reply(
    context: IAgentContext,
    callbacks?: IAgentCallbacks
  ): Promise<IAgentResponse> {
    // Process the context and callbacks to generate a response
    // Stream the tokens of the response as we receive them
    callbacks.onMessagePart({
      contentChunk: "This",
    });
    callbacks.onMessagePart({
      contentChunk: " is",
    });
    callbacks.onMessagePart({
      contentChunk: " my",
    });
    callbacks.onMessagePart({
      contentChunk: " response",
    });
    // Once we have finished getting the response, we return the final response message.
    // It is not required for the final response to exactly match the streamed data and only this final response
    // is stored in the conversation history.
    return {
      content: "This is my response",
    };
  }
}
```

## Registering your agent(s)

To connect your agent(s) to the ConvoStack backend, we suggest using the `DefaultAgentManager` and providing that
to the ConvoStack backend's `agents` property.
The manager accepts a map of agent configurations and a default agent key, which is used to start new conversations
when no particular agent is specified (e.g., when the user just opens the widget).

Here's an example of defining and connecting multiple agents with `DefaultAgentManager`:

```typescript
import {IDefaultAgentManagerAgentsConfig} from "convostack/agent";
import {DefaultAgentManager} from "convostack/agent-default-manager";
import {LangchainChat} from "./langchain-chat";
import {AgentEcho} from "convostack/agent-echo";

export const defaultAgentKey = "default";

export const agents: { [key: string]: IDefaultAgentManagerAgentsConfig } = {
    "default": {
        agent: new LangchainChat(),
        metadata: {...}
    },
    "echo-agent": {
        agent: new AgentEcho(),
        metadata: {...}
    },
    // More agents...
};

// Then pass this configuration to the ConvoStack backend
const backend = new ConvoStackBackendExpress({
    // Other configurations...
    agents: new DefaultAgentManager(agents, defaultAgentKey),
});
```

## Using Langchain with ConvoStack for LLM-based agents

Langchain offers a suite of tools for handling conversation chains powered by language models like OpenAI. Here's
a complete example of how Langchain integrates with a ConvoStack agent with streaming and message history:

```typescript
import {
  IAgent,
  IAgentCallbacks,
  IAgentContext,
  IAgentResponse,
} from "convostack/agent";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ConvoStackLangchainChatMessageHistory } from "convostack/langchain-memory";

export class ExampleLangchainChatAgent implements IAgent {
  async reply(
    context: IAgentContext,
    callbacks?: IAgentCallbacks
  ): Promise<IAgentResponse> {
    // Create a new Langchain OpenAI chat model, with streaming
    const chat = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            // Stream tokens to ConvoStack
            callbacks.onMessagePart({
              contentChunk: token,
            });
          },
        },
      ],
    });

    // Setup your prompts (note the placeholder for {history})
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
      ),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    // Setup the chain with a BufferMemory that pulls from the ConvoStack conversation history
    const chain = new ConversationChain({
      memory: new BufferMemory({
        // Use the ConvoStackLangchainChatMessageHistory class to prepare a Langchain-compatible version of the history
        chatHistory: new ConvoStackLangchainChatMessageHistory({
          // Pass the current conversation's message history for loading
          history: context.getHistory(),
        }),
        returnMessages: true,
        memoryKey: "history",
      }),
      prompt: chatPrompt,
      llm: chat,
    });

    // Invoke the chain with the content of the message that the user sent via the ConvoStack frontend
    const resp = await chain.call({
      input: context.getHumanMessage().content,
    });

    // Send the final response to ConvoStack
    return {
      content: resp.response,
      contentType: "markdown",
    };
  }
}
```

## Accessing message history

Agents can access the conversation history through the `IAgentContext` interface. It provides the `getHistory()` method
that returns the conversation history.

```typescript
import {
  IAgent,
  IAgentCallbacks,
  IAgentContext,
  IAgentResponse,
} from "convostack/agent";

export class MyAgent implements IAgent {
  async reply(
    context: IAgentContext,
    callbacks?: IAgentCallbacks
  ): Promise<IAgentResponse> {
    // You can always access the history of message objects using the following method:
    let history = context.getHistory();
    // You are free to use the history however you see fit. For connecting to langchain, check out our section
    // on langchain above for pre-built convenience methods.
  }
}
```

## Additional context data for agents

Often times your agent might need to know more than just the message history. For example, it might be useful to have
the content of the page that the user is currently looking at. The ConvoStack frontend allows continuous setting of the
`context` map (`{ [key: string]: any }`) which can then be accessed by the agent using `context.getContextArgs()`. Check out the
code sample below for a minimal example of how to get this context data (called context 'args' on the backend):

```typescript
import {
  IAgent,
  IAgentCallbacks,
  IAgentContext,
  IAgentResponse,
} from "convostack/agent";

export class MyAgent implements IAgent {
  async reply(
    context: IAgentContext,
    callbacks?: IAgentCallbacks
  ): Promise<IAgentResponse> {
    // Get the arbitrary context data optionally passed in by the client
    // The type of the context should be a key:value map where the keys must be strings and values can be of any type
    // Your agent must implement its own handling, checking, and validation of the context data
    let contextArgs = context.getContextArgs();
  }
}
```
