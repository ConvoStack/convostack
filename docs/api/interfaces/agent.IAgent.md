[convostack - v0.0.15](../README.md) / [agent](../modules/agent.md) / IAgent

# Interface: IAgent

[agent](../modules/agent.md).IAgent

## Implemented by

- [`AgentEcho`](../classes/agent_echo.AgentEcho.md)
- [`AgentSSEClient`](../classes/agent_sse.AgentSSEClient.md)

## Table of contents

### Methods

- [reply](agent.IAgent.md#reply)

## Methods

### reply

▸ **reply**(`context`, `callbacks?`): `Promise`<[`IAgentResponse`](agent.IAgentResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`IAgentContext`](agent.IAgentContext.md) |
| `callbacks?` | [`IAgentCallbacks`](agent.IAgentCallbacks.md) |

#### Returns

`Promise`<[`IAgentResponse`](agent.IAgentResponse.md)\>

#### Defined in

packages/convostack-agent/dist/index.d.ts:4
