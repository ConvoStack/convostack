[convostack - v0.0.15](../README.md) / [agent](../modules/agent.md) / DefaultAgentManager

# Class: DefaultAgentManager

[agent](../modules/agent.md).DefaultAgentManager

## Implements

- [`IAgentManager`](../interfaces/agent.IAgentManager.md)

## Table of contents

### Constructors

- [constructor](agent.DefaultAgentManager.md#constructor)

### Methods

- [getAgent](agent.DefaultAgentManager.md#getagent)
- [getAgentAIRole](agent.DefaultAgentManager.md#getagentairole)
- [getAgentAvatarUrl](agent.DefaultAgentManager.md#getagentavatarurl)
- [getAgentDisplayName](agent.DefaultAgentManager.md#getagentdisplayname)
- [getAgentHumanRole](agent.DefaultAgentManager.md#getagenthumanrole)
- [getAgentPrimer](agent.DefaultAgentManager.md#getagentprimer)
- [getDefaultAgent](agent.DefaultAgentManager.md#getdefaultagent)
- [getDefaultAgentKey](agent.DefaultAgentManager.md#getdefaultagentkey)
- [listAvailableAgents](agent.DefaultAgentManager.md#listavailableagents)

## Constructors

### constructor

• **new DefaultAgentManager**(`agents`, `defaultAgentKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `agents` | `Object` |
| `defaultAgentKey` | `string` |

#### Defined in

packages/convostack-agent/dist/index.d.ts:51

## Methods

### getAgent

▸ **getAgent**(`key`): [`IAgent`](../interfaces/agent.IAgent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`IAgent`](../interfaces/agent.IAgent.md)

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getAgent](../interfaces/agent.IAgentManager.md#getagent)

#### Defined in

packages/convostack-agent/dist/index.d.ts:56

___

### getAgentAIRole

▸ **getAgentAIRole**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getAgentAIRole](../interfaces/agent.IAgentManager.md#getagentairole)

#### Defined in

packages/convostack-agent/dist/index.d.ts:60

___

### getAgentAvatarUrl

▸ **getAgentAvatarUrl**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getAgentAvatarUrl](../interfaces/agent.IAgentManager.md#getagentavatarurl)

#### Defined in

packages/convostack-agent/dist/index.d.ts:62

___

### getAgentDisplayName

▸ **getAgentDisplayName**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getAgentDisplayName](../interfaces/agent.IAgentManager.md#getagentdisplayname)

#### Defined in

packages/convostack-agent/dist/index.d.ts:57

___

### getAgentHumanRole

▸ **getAgentHumanRole**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getAgentHumanRole](../interfaces/agent.IAgentManager.md#getagenthumanrole)

#### Defined in

packages/convostack-agent/dist/index.d.ts:59

___

### getAgentPrimer

▸ **getAgentPrimer**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getAgentPrimer](../interfaces/agent.IAgentManager.md#getagentprimer)

#### Defined in

packages/convostack-agent/dist/index.d.ts:58

___

### getDefaultAgent

▸ **getDefaultAgent**(): [`IAgent`](../interfaces/agent.IAgent.md)

#### Returns

[`IAgent`](../interfaces/agent.IAgent.md)

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getDefaultAgent](../interfaces/agent.IAgentManager.md#getdefaultagent)

#### Defined in

packages/convostack-agent/dist/index.d.ts:55

___

### getDefaultAgentKey

▸ **getDefaultAgentKey**(): `string`

#### Returns

`string`

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[getDefaultAgentKey](../interfaces/agent.IAgentManager.md#getdefaultagentkey)

#### Defined in

packages/convostack-agent/dist/index.d.ts:54

___

### listAvailableAgents

▸ **listAvailableAgents**(): `string`[]

#### Returns

`string`[]

#### Implementation of

[IAgentManager](../interfaces/agent.IAgentManager.md).[listAvailableAgents](../interfaces/agent.IAgentManager.md#listavailableagents)

#### Defined in

packages/convostack-agent/dist/index.d.ts:61
