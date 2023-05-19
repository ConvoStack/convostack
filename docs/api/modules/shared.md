[convostack - v0.0.16](../README.md) / shared

# Module: shared

## Table of contents

### Variables

- [AI\_ROLE](shared.md#ai_role)
- [CONVERSATION\_EVENT\_KIND\_CONVERSATION\_METADATA](shared.md#conversation_event_kind_conversation_metadata)
- [CONVERSATION\_EVENT\_KIND\_MESSAGE](shared.md#conversation_event_kind_message)
- [CONVERSATION\_EVENT\_KIND\_MESSAGE\_PART](shared.md#conversation_event_kind_message_part)
- [HUMAN\_ROLE](shared.md#human_role)

### Functions

- [addSecondsToDate](shared.md#addsecondstodate)
- [generateRandomID](shared.md#generaterandomid)
- [unixTimestamp](shared.md#unixtimestamp)

## Variables

### AI\_ROLE

• `Const` **AI\_ROLE**: ``"AI"``

#### Defined in

packages/convostack-shared/dist/index.d.ts:4

___

### CONVERSATION\_EVENT\_KIND\_CONVERSATION\_METADATA

• `Const` **CONVERSATION\_EVENT\_KIND\_CONVERSATION\_METADATA**: ``"conversation_metadata"``

#### Defined in

packages/convostack-shared/dist/index.d.ts:3

___

### CONVERSATION\_EVENT\_KIND\_MESSAGE

• `Const` **CONVERSATION\_EVENT\_KIND\_MESSAGE**: ``"message"``

#### Defined in

packages/convostack-shared/dist/index.d.ts:1

___

### CONVERSATION\_EVENT\_KIND\_MESSAGE\_PART

• `Const` **CONVERSATION\_EVENT\_KIND\_MESSAGE\_PART**: ``"message_part"``

#### Defined in

packages/convostack-shared/dist/index.d.ts:2

___

### HUMAN\_ROLE

• `Const` **HUMAN\_ROLE**: ``"Human"``

#### Defined in

packages/convostack-shared/dist/index.d.ts:5

## Functions

### addSecondsToDate

▸ **addSecondsToDate**(`date`, `seconds`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |
| `seconds` | `number` |

#### Returns

`Date`

#### Defined in

packages/convostack-shared/dist/index.d.ts:10

___

### generateRandomID

▸ **generateRandomID**(`length`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Returns

`string`

#### Defined in

packages/convostack-shared/dist/index.d.ts:7

___

### unixTimestamp

▸ **unixTimestamp**(`date?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date?` | `Date` |

#### Returns

`number`

#### Defined in

packages/convostack-shared/dist/index.d.ts:9
