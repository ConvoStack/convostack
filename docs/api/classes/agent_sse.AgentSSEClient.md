[convostack - v0.0.16](../README.md) / [agent-sse](../modules/agent_sse.md) / AgentSSEClient

# Class: AgentSSEClient

[agent-sse](../modules/agent_sse.md).AgentSSEClient

## Implements

- [`IAgent`](../interfaces/agent.IAgent.md)

## Table of contents

### Constructors

- [constructor](agent_sse.AgentSSEClient.md#constructor)

### Methods

- [reply](agent_sse.AgentSSEClient.md#reply)

## Constructors

### constructor

• **new AgentSSEClient**(`sseUrl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sseUrl` | `string` |

#### Defined in

packages/convostack-agent-sse/dist/index.d.ts:5

## Methods

### reply

▸ **reply**(`context`, `callbacks`): `Promise`<[`IAgentResponse`](../interfaces/agent.IAgentResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`IAgentContext`](../interfaces/agent.IAgentContext.md) |
| `callbacks` | [`IAgentCallbacks`](../interfaces/agent.IAgentCallbacks.md) |

#### Returns

`Promise`<[`IAgentResponse`](../interfaces/agent.IAgentResponse.md)\>

#### Implementation of

[IAgent](../interfaces/agent.IAgent.md).[reply](../interfaces/agent.IAgent.md#reply)

#### Defined in

packages/convostack-agent-sse/dist/index.d.ts:6
