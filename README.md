<h1 style="margin-top: 0px">ConvoStack 💬⭐</h1>

<img width="1439" alt="Screenshot 2023-06-02 at 2 47 17 AM" src="https://github.com/ConvoStack/convostack/assets/8688852/40fdbf63-4f53-4143-8628-39c934eaaed4">

## Key Features 

ConvoStack is a plug-and-play embeddable AI chatbot widget and backend deployment framework for your website. **It is
completely free and open source and currently running on our [docs](https://docs.convostack.ai/) website!**

The core technologies are:

* React (frontend)
* Express.js (backend)
* Redis (Production cache & pub/sub)
* Langchain (AI agent framework integration)

To learn more about the project, compatible technologies, and how to get started, check out
the [docs](https://docs.convostack.ai/).

## Try it out

To see a live demo of ConvoStack, check out our free [playground](https://playground.convostack.ai)!

## Getting Started

Get your AI chatbot up and running in minutes with our [Quickstart repo and guide](https://github.com/ConvoStack/quickstart):

In the following example, we are connecting a Langchain OpenAI [LLM](https://js.langchain.com/docs/modules/models/llms/) to the chatbot playground.

```typescript
import * as dotenv from "dotenv";
// Configures the OpenAI API key
dotenv.config();

import { playground } from "convostack/playground";
import { IAgentContext, IAgentResponse } from "convostack/agent";
import { OpenAI } from "langchain/llms/openai";

playground({
  async reply(context: IAgentContext): Promise<IAgentResponse> {
    // `humanMessage` is the content of each message the user sends via the chatbot playground.
    let humanMessage = context.getHumanMessage().content;
    // `agent` is the OpenAI agent we want to use to respond to each `humanMessage`
    const agent = new OpenAI({ modelName: "gpt-3.5-turbo" });
    // `call` is a simple string-in, string-out method for interacting with the OpenAI agent.
    const resp = await model.call(humanMessage);
    // `resp` is the generated agent's response to the user's `humanMessage`
    return {
      content: resp,
      contentType: "markdown",
    };
  },
});
```
**See the code above in action:**
![ConvoStack Quickstart Example 1](https://github.com/ConvoStack/convostack/assets/8688852/f917120c-f0a7-440a-96b4-982ba2d4fdad)

Follow our [quickstart guide](https://docs.convostack.ai/getting-started/) for more Langchain + ConvoStack examples.

## Installation

To add the ConvoStack framework to an existing project, run the following command:

```bash
npm install --save convostack
```

## Architecture

![](docs/static/img/convostack-explainer-v1.png)

## Documentation

To see the full documentation check out our docs site at [docs.convostack.ai](https://docs.convostack.ai).
