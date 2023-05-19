[convostack - v0.0.15](../README.md) / agent-sse-echo-server

# Module: agent-sse-echo-server

## Table of contents

### Functions

- [serveEchoAgentDev](agent_sse_echo_server.md#serveechoagentdev)
- [sseEchoHandler](agent_sse_echo_server.md#sseechohandler)

## Functions

### serveEchoAgentDev

▸ **serveEchoAgentDev**(`port`, `host?`, `path?`): `Promise`<`void`\>

serveDev provides an express handler that will echo the agent input back as a server-side events stream.
This route is compatible with the agent-sse library. This route requires the express.json() (or similar) middleware
to ensure that the JSON request body is parsed into an object. Use this if you want to run an echo server on an existing Express app.

**`Example`**

```
await serveDev(3001, 'localhost', '/api/chat');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `number` | Port to run the Express app on |
| `host?` | `string` | Host to run the Express app on (usually localhost, 127.0.0.1, or 0.0.0.0) |
| `path?` | `string` | Path to run the echoHandler on |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/convostack-agent-sse-echo-server/dist/index.d.ts:31

___

### sseEchoHandler

▸ **sseEchoHandler**(`req`, `res`): `void`

echoHandler provides an express handler that will echo the agent input back as a server-side events stream.
This route is compatible with the agent-sse library. This route requires the express.json() (or similar) middleware
to ensure that the JSON request body is parsed into an object. Use this if you want to run an echo server on an existing Express app.

**`Example`**

```
app.post('/api/chat', express.json(), echoHandler);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> | Express Request |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> | Express Response |

#### Returns

`void`

#### Defined in

packages/convostack-agent-sse-echo-server/dist/index.d.ts:16
