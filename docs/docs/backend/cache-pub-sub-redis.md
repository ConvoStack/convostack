# Cache & Pub/Sub Redis Integration

This document provides instructions for setting up Redis-based caching and pub/sub in the ConvoStack backend system.
Redis is an optional component that can be used to enhance the performance and scalability of the system.

We strongly recommend using Redis for any production ConvoStack deployment. It is a must-have in any case where multiple
instances of ConvoStack are being operated concurrently on the same database to ensure that messages are properly
streamed to clients.

## Prerequisites

Before proceeding with the Redis integration, make sure you have the following prerequisites:

- Redis server installed and running.
- Redis URL or connection information.

## Installation

To use Redis-based caching and pub/sub in the ConvoStack backend, follow these steps:

1. Install the required dependencies:

```shell
npm install redis ioredis graphql-redis-subscriptions
```

2. Import the necessary modules in your code:

```typescript
import Redis from 'ioredis';
import {RedisPubSub} from 'graphql-redis-subscriptions';
```

3. Set up Redis caching and pub/sub using the provided Redis URL or connection information. Update your code snippet
   accordingly:

```typescript
// Setup Redis-based caching and pub/sub if we set the REDIS_URL env var
const convEventsOpts = {} as IConversationEventServiceOptions;
if (process.env.REDIS_URL) {
    convEventsOpts.pubSubEngine = new RedisPubSub({
        connection: process.env.REDIS_URL
    });
    convEventsOpts.cache = new Redis(process.env.REDIS_URL);
}
```

Make sure to set the `REDIS_URL` env var with your Redis URL.

4. Initialize the ConvoStack backend with the configured Redis cache and pub/sub:

```typescript
const backend = new ConvoStackBackendExpress({
    conversationEventServiceOptions: convEventsOpts,
    // ...
});
```
