[convostack - v0.0.16](../README.md) / [agent](../modules/agent.md) / IAgentManager

# Interface: IAgentManager

[agent](../modules/agent.md).IAgentManager

## Implemented by

- [`DefaultAgentManager`](../classes/agent.DefaultAgentManager.md)

## Table of contents

### Methods

- [getAgent](agent.IAgentManager.md#getagent)
- [getAgentAIRole](agent.IAgentManager.md#getagentairole)
- [getAgentAvatarUrl](agent.IAgentManager.md#getagentavatarurl)
- [getAgentDisplayName](agent.IAgentManager.md#getagentdisplayname)
- [getAgentHumanRole](agent.IAgentManager.md#getagenthumanrole)
- [getAgentPrimer](agent.IAgentManager.md#getagentprimer)
- [getDefaultAgent](agent.IAgentManager.md#getdefaultagent)
- [getDefaultAgentKey](agent.IAgentManager.md#getdefaultagentkey)
- [listAvailableAgents](agent.IAgentManager.md#listavailableagents)

## Methods

### getAgent

▸ **getAgent**(`key`): [`IAgent`](agent.IAgent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`IAgent`](agent.IAgent.md)

#### Defined in

packages/convostack-agent/dist/index.d.ts:36

___

### getAgentAIRole

▸ **getAgentAIRole**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

packages/convostack-agent/dist/index.d.ts:41

___

### getAgentAvatarUrl

▸ **getAgentAvatarUrl**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

packages/convostack-agent/dist/index.d.ts:39

___

### getAgentDisplayName

▸ **getAgentDisplayName**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

packages/convostack-agent/dist/index.d.ts:38

___

### getAgentHumanRole

▸ **getAgentHumanRole**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

packages/convostack-agent/dist/index.d.ts:40

___

### getAgentPrimer

▸ **getAgentPrimer**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

packages/convostack-agent/dist/index.d.ts:37

___

### getDefaultAgent

▸ **getDefaultAgent**(): [`IAgent`](agent.IAgent.md)

#### Returns

[`IAgent`](agent.IAgent.md)

#### Defined in

packages/convostack-agent/dist/index.d.ts:34

___

### getDefaultAgentKey

▸ **getDefaultAgentKey**(): `string`

#### Returns

`string`

#### Defined in

packages/convostack-agent/dist/index.d.ts:35

___

### listAvailableAgents

▸ **listAvailableAgents**(): `string`[]

#### Returns

`string`[]

#### Defined in

packages/convostack-agent/dist/index.d.ts:42
