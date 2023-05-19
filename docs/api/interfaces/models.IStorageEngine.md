[convostack - v0.0.15](../README.md) / [models](../modules/models.md) / IStorageEngine

# Interface: IStorageEngine

[models](../modules/models.md).IStorageEngine

## Implemented by

- [`StorageEnginePrismaMySQL`](../classes/storage_engine_prisma_mysql.StorageEnginePrismaMySQL.md)
- [`StorageEnginePrismaPostgres`](../classes/storage_engine_prisma_postgres.StorageEnginePrismaPostgres.md)
- [`StorageEnginePrismaSQLite`](../classes/storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md)

## Table of contents

### Methods

- [createConversation](models.IStorageEngine.md#createconversation)
- [createMessage](models.IStorageEngine.md#createmessage)
- [createUser](models.IStorageEngine.md#createuser)
- [deleteConversation](models.IStorageEngine.md#deleteconversation)
- [deleteMessage](models.IStorageEngine.md#deletemessage)
- [deleteUser](models.IStorageEngine.md#deleteuser)
- [findConversation](models.IStorageEngine.md#findconversation)
- [findConversations](models.IStorageEngine.md#findconversations)
- [findMessage](models.IStorageEngine.md#findmessage)
- [findMessages](models.IStorageEngine.md#findmessages)
- [findUser](models.IStorageEngine.md#finduser)
- [updateConversation](models.IStorageEngine.md#updateconversation)
- [updateMessage](models.IStorageEngine.md#updatemessage)
- [updateUser](models.IStorageEngine.md#updateuser)

## Methods

### createConversation

▸ **createConversation**(`conversation`): `Promise`<[`IConversation`](models.IConversation.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conversation` | `Partial`<[`IConversation`](models.IConversation.md)\> |

#### Returns

`Promise`<[`IConversation`](models.IConversation.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:63

___

### createMessage

▸ **createMessage**(`message`): `Promise`<[`IMessage`](models.IMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Partial`<[`IMessage`](models.IMessage.md)\> |

#### Returns

`Promise`<[`IMessage`](models.IMessage.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:68

___

### createUser

▸ **createUser**(`user`): `Promise`<[`IUser`](models.IUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Partial`<[`IUser`](models.IUser.md)\> |

#### Returns

`Promise`<[`IUser`](models.IUser.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:59

___

### deleteConversation

▸ **deleteConversation**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/convostack-models/dist/index.d.ts:67

___

### deleteMessage

▸ **deleteMessage**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/convostack-models/dist/index.d.ts:72

___

### deleteUser

▸ **deleteUser**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/convostack-models/dist/index.d.ts:62

___

### findConversation

▸ **findConversation**(`filter`): `Promise`<[`IConversation`](models.IConversation.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`IConversationFilter`](models.IConversationFilter.md) |

#### Returns

`Promise`<[`IConversation`](models.IConversation.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:65

___

### findConversations

▸ **findConversations**(`filter?`, `orderBy?`, `skip?`, `take?`): `Promise`<[`IConversation`](models.IConversation.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | [`IConversationFilter`](models.IConversationFilter.md) |
| `orderBy?` | `Partial`<`Record`<keyof [`IConversation`](models.IConversation.md), ``"asc"`` \| ``"desc"``\>\> |
| `skip?` | `number` |
| `take?` | `number` |

#### Returns

`Promise`<[`IConversation`](models.IConversation.md)[]\>

#### Defined in

packages/convostack-models/dist/index.d.ts:66

___

### findMessage

▸ **findMessage**(`filter`): `Promise`<[`IMessage`](models.IMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`IMessageFilter`](models.IMessageFilter.md) |

#### Returns

`Promise`<[`IMessage`](models.IMessage.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:70

___

### findMessages

▸ **findMessages**(`filter?`, `orderBy?`, `skip?`, `take?`): `Promise`<[`IMessage`](models.IMessage.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | [`IMessageFilter`](models.IMessageFilter.md) |
| `orderBy?` | `Partial`<`Record`<keyof [`IMessage`](models.IMessage.md), ``"asc"`` \| ``"desc"``\>\> |
| `skip?` | `number` |
| `take?` | `number` |

#### Returns

`Promise`<[`IMessage`](models.IMessage.md)[]\>

#### Defined in

packages/convostack-models/dist/index.d.ts:71

___

### findUser

▸ **findUser**(`filter`): `Promise`<[`IUser`](models.IUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`IUserFilter`](models.IUserFilter.md) |

#### Returns

`Promise`<[`IUser`](models.IUser.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:61

___

### updateConversation

▸ **updateConversation**(`id`, `data`): `Promise`<[`IConversation`](models.IConversation.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `Partial`<[`IConversation`](models.IConversation.md)\> |

#### Returns

`Promise`<[`IConversation`](models.IConversation.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:64

___

### updateMessage

▸ **updateMessage**(`id`, `data`): `Promise`<[`IMessage`](models.IMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `Partial`<[`IMessage`](models.IMessage.md)\> |

#### Returns

`Promise`<[`IMessage`](models.IMessage.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:69

___

### updateUser

▸ **updateUser**(`id`, `data`): `Promise`<[`IUser`](models.IUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `Partial`<[`IUser`](models.IUser.md)\> |

#### Returns

`Promise`<[`IUser`](models.IUser.md)\>

#### Defined in

packages/convostack-models/dist/index.d.ts:60
