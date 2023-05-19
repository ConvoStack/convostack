[convostack - v0.0.15](../README.md) / frontend-react

# Module: frontend-react

## Table of contents

### Functions

- [ConvoStackWrapper](frontend_react.md#convostackwrapper)
- [EmbedChat](frontend_react.md#embedchat)
- [useConvoStack](frontend_react.md#useconvostack)

## Functions

### ConvoStackWrapper

▸ **ConvoStackWrapper**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ConvoStackWrapperProps` |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:515

___

### EmbedChat

▸ **EmbedChat**(`props`, `context?`): `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `EmbedChatProps` |
| `context?` | `any` |

#### Returns

`ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:515

___

### useConvoStack

▸ **useConvoStack**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `activeConversationId` | `string` |
| `agent` | `string` |
| `context` | { `[key: string]`: `string`;  } |
| `createdFirstConversation` | `boolean` |
| `data` | `any` |
| `graphqlUrl` | `string` |
| `isConversationListVisible` | `boolean` |
| `isConversationWindowVisible` | `boolean` |
| `openConversation` | (`conversationId`: `string`, `agent?`: `string`, `context?`: { `[key: string]`: `string`;  }, `key?`: `string`) => `Promise`<`string`\> |
| `openConversationList` | (`key?`: `string`) => `void` |
| `setActiveConversationId` | (`conversationId`: `string`, `context?`: { `[key: string]`: `string`;  }, `key?`: `string`) => `void` |
| `styling` | `CustomStyling` |
| `toggleWidget` | (`arg`: `boolean`) => `void` |
| `updateContext` | (`conversationId`: `string`, `context`: { `[key: string]`: `string`;  }) => `Promise`<`void`\> |
| `userData` | `UserData` |
| `websocketUrl` | `string` |

#### Defined in

packages/convostack-frontend-react/dist/src/hooks/useConvoStack.d.ts:1
