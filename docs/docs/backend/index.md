---
id: "index"
title: "Overview"
sidebar_label: "Overview"
sidebar_position: 0.1
pagination_next: "backend/llm-and-chat-agents"
---

# ConvoStack Backend

This documentation provides information about everything backend-related for ConvoStack.

The ConvoStack backend's core can be located in the `convostack/backend-express` package, which is included when
you install `convostack` via npm. The majority of the ConvoStack backend is constructed using flexible Typescript
interfaces, enabling extensive customization options. However, we have adopted a batteries-included approach to ensure a
quick and effortless setup process, allowing you to be up and running within minutes.

## Key Modules

The primary modules of the ConvoStack backend that you are likely to encounter and/or need to customize include:

#### [Agents](./llm-and-chat-agents)

Agents in ConvoStack encapsulate your chat models, so whenever you wish to create a new 'bot' for your users, you would
leverage the agents module. This is also where you will find utilities for integrating with other libraries, like
Langchain to speed up your chat agent development process.

To learn more about creating and managing agents, check out the relevant page in the docs [here](./llm-and-chat-agents).

#### [Storage](./storage-engines)

Storing backend messages, users, and other ConvoStack metadata is critical for the proper function of the backend. We
provide a handful of built-in SQL database implementations, and you are also free to build your own!

To learn more about storage, check out the relevant page in the docs [here](./storage-engines).

#### [Authentication Middleware](./auth)

While you're unlikely to find authentication implemented by most chat kits, ConvoStack is a little bit different in that
its a full-stack platform that is built to get you into production. Connecting user data and authentication happens to
be one of those tricky problems that always needs solving before you can go live. We provide a very easy-to-use
authentication middleware module (`convostack/auth-jwt`), but you can also build your own by implementing our
public auth interface.

To learn more about auth, check out the relevant page in the docs [here](./auth).

#### [Cache and pub/sub](./cache-pub-sub-redis.md)

In order to operate ConvoStack in production, we offer options for caching and pub/sub to handle messages across
multiple instance. We suggest a Redis-based option for going to production, and you are also free to build your own!

To learn more about caching and pub/sub, check out the relevant page in the docs [here](./cache-pub-sub-redis.md)
