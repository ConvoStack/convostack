[convostack - v0.0.16](../README.md) / [langchain-memory](../modules/langchain_memory.md) / ConvoStackLangchainChatMessageHistory

# Class: ConvoStackLangchainChatMessageHistory

[langchain-memory](../modules/langchain_memory.md).ConvoStackLangchainChatMessageHistory

## Hierarchy

- `BaseListChatMessageHistory`

  ↳ **`ConvoStackLangchainChatMessageHistory`**

## Table of contents

### Constructors

- [constructor](langchain_memory.ConvoStackLangchainChatMessageHistory.md#constructor)

### Methods

- [addMessage](langchain_memory.ConvoStackLangchainChatMessageHistory.md#addmessage)
- [clear](langchain_memory.ConvoStackLangchainChatMessageHistory.md#clear)
- [getMessages](langchain_memory.ConvoStackLangchainChatMessageHistory.md#getmessages)

## Constructors

### constructor

• **new ConvoStackLangchainChatMessageHistory**(`fields`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`ConvoStackLangchainChatMessageHistoryInput`](../modules/langchain_memory.md#convostacklangchainchatmessagehistoryinput) |

#### Overrides

BaseListChatMessageHistory.constructor

#### Defined in

packages/convostack-langchain-memory/dist/index.d.ts:9

## Methods

### addMessage

▸ **addMessage**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `BaseChatMessage` |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseListChatMessageHistory.addMessage

#### Defined in

packages/convostack-langchain-memory/dist/index.d.ts:11

___

### clear

▸ **clear**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

packages/convostack-langchain-memory/dist/index.d.ts:12

___

### getMessages

▸ **getMessages**(): `Promise`<`BaseChatMessage`[]\>

#### Returns

`Promise`<`BaseChatMessage`[]\>

#### Defined in

packages/convostack-langchain-memory/dist/index.d.ts:10
