[convostack - v0.0.15](../README.md) / [storage-engine-prisma-sqlite](../modules/storage_engine_prisma_sqlite.md) / StorageEnginePrismaSQLite

# Class: StorageEnginePrismaSQLite

[storage-engine-prisma-sqlite](../modules/storage_engine_prisma_sqlite.md).StorageEnginePrismaSQLite

## Implements

- [`IStorageEngine`](../interfaces/models.IStorageEngine.md)

## Table of contents

### Constructors

- [constructor](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#constructor)

### Methods

- [createConversation](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#createconversation)
- [createMessage](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#createmessage)
- [createUser](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#createuser)
- [deleteConversation](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#deleteconversation)
- [deleteMessage](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#deletemessage)
- [deleteUser](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#deleteuser)
- [findConversation](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#findconversation)
- [findConversations](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#findconversations)
- [findMessage](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#findmessage)
- [findMessages](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#findmessages)
- [findUser](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#finduser)
- [init](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#init)
- [updateConversation](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#updateconversation)
- [updateMessage](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#updatemessage)
- [updateUser](storage_engine_prisma_sqlite.StorageEnginePrismaSQLite.md#updateuser)

## Constructors

### constructor

• **new StorageEnginePrismaSQLite**(`dbUrl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbUrl` | `string` |

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:4

## Methods

### createConversation

▸ **createConversation**(`conversation`): `Promise`<[`IConversation`](../interfaces/models.IConversation.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conversation` | `Partial`<[`IConversation`](../interfaces/models.IConversation.md)\> |

#### Returns

`Promise`<[`IConversation`](../interfaces/models.IConversation.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[createConversation](../interfaces/models.IStorageEngine.md#createconversation)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:10

___

### createMessage

▸ **createMessage**(`message`): `Promise`<[`IMessage`](../interfaces/models.IMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Partial`<[`IMessage`](../interfaces/models.IMessage.md)\> |

#### Returns

`Promise`<[`IMessage`](../interfaces/models.IMessage.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[createMessage](../interfaces/models.IStorageEngine.md#createmessage)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:15

___

### createUser

▸ **createUser**(`user`): `Promise`<[`IUser`](../interfaces/models.IUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `Partial`<[`IUser`](../interfaces/models.IUser.md)\> |

#### Returns

`Promise`<[`IUser`](../interfaces/models.IUser.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[createUser](../interfaces/models.IStorageEngine.md#createuser)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:6

___

### deleteConversation

▸ **deleteConversation**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[deleteConversation](../interfaces/models.IStorageEngine.md#deleteconversation)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:14

___

### deleteMessage

▸ **deleteMessage**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[deleteMessage](../interfaces/models.IStorageEngine.md#deletemessage)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:19

___

### deleteUser

▸ **deleteUser**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[deleteUser](../interfaces/models.IStorageEngine.md#deleteuser)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:9

___

### findConversation

▸ **findConversation**(`filter`): `Promise`<[`IConversation`](../interfaces/models.IConversation.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`IConversationFilter`](../interfaces/models.IConversationFilter.md) |

#### Returns

`Promise`<[`IConversation`](../interfaces/models.IConversation.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[findConversation](../interfaces/models.IStorageEngine.md#findconversation)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:12

___

### findConversations

▸ **findConversations**(`filter?`, `orderBy?`, `skip?`, `take?`): `Promise`<[`IConversation`](../interfaces/models.IConversation.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | [`IConversationFilter`](../interfaces/models.IConversationFilter.md) |
| `orderBy?` | `Partial`<`Record`<keyof [`IConversation`](../interfaces/models.IConversation.md), ``"asc"`` \| ``"desc"``\>\> |
| `skip?` | `number` |
| `take?` | `number` |

#### Returns

`Promise`<[`IConversation`](../interfaces/models.IConversation.md)[]\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[findConversations](../interfaces/models.IStorageEngine.md#findconversations)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:13

___

### findMessage

▸ **findMessage**(`filter`): `Promise`<[`IMessage`](../interfaces/models.IMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`IMessageFilter`](../interfaces/models.IMessageFilter.md) |

#### Returns

`Promise`<[`IMessage`](../interfaces/models.IMessage.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[findMessage](../interfaces/models.IStorageEngine.md#findmessage)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:17

___

### findMessages

▸ **findMessages**(`filter?`, `orderBy?`, `skip?`, `take?`): `Promise`<[`IMessage`](../interfaces/models.IMessage.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | [`IMessageFilter`](../interfaces/models.IMessageFilter.md) |
| `orderBy?` | `Partial`<`Record`<keyof [`IMessage`](../interfaces/models.IMessage.md), ``"asc"`` \| ``"desc"``\>\> |
| `skip?` | `number` |
| `take?` | `number` |

#### Returns

`Promise`<[`IMessage`](../interfaces/models.IMessage.md)[]\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[findMessages](../interfaces/models.IStorageEngine.md#findmessages)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:18

___

### findUser

▸ **findUser**(`filter`): `Promise`<[`IUser`](../interfaces/models.IUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`IUserFilter`](../interfaces/models.IUserFilter.md) |

#### Returns

`Promise`<[`IUser`](../interfaces/models.IUser.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[findUser](../interfaces/models.IStorageEngine.md#finduser)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:8

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:5

___

### updateConversation

▸ **updateConversation**(`id`, `data`): `Promise`<[`IConversation`](../interfaces/models.IConversation.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `Partial`<[`IConversation`](../interfaces/models.IConversation.md)\> |

#### Returns

`Promise`<[`IConversation`](../interfaces/models.IConversation.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[updateConversation](../interfaces/models.IStorageEngine.md#updateconversation)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:11

___

### updateMessage

▸ **updateMessage**(`id`, `data`): `Promise`<[`IMessage`](../interfaces/models.IMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `Partial`<[`IMessage`](../interfaces/models.IMessage.md)\> |

#### Returns

`Promise`<[`IMessage`](../interfaces/models.IMessage.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[updateMessage](../interfaces/models.IStorageEngine.md#updatemessage)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:16

___

### updateUser

▸ **updateUser**(`id`, `data`): `Promise`<[`IUser`](../interfaces/models.IUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | `Partial`<[`IUser`](../interfaces/models.IUser.md)\> |

#### Returns

`Promise`<[`IUser`](../interfaces/models.IUser.md)\>

#### Implementation of

[IStorageEngine](../interfaces/models.IStorageEngine.md).[updateUser](../interfaces/models.IStorageEngine.md#updateuser)

#### Defined in

packages/convostack-storage-engine-prisma-sqlite/dist/index.d.ts:7
