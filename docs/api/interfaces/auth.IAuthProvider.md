[convostack - v0.0.16](../README.md) / [auth](../modules/auth.md) / IAuthProvider

# Interface: IAuthProvider

[auth](../modules/auth.md).IAuthProvider

## Implemented by

- [`AuthJWT`](../classes/auth_jwt.AuthJWT.md)

## Table of contents

### Methods

- [getGQLAuthContextHTTP](auth.IAuthProvider.md#getgqlauthcontexthttp)
- [getGQLAuthContextWS](auth.IAuthProvider.md#getgqlauthcontextws)
- [login](auth.IAuthProvider.md#login)
- [refresh](auth.IAuthProvider.md#refresh)

## Methods

### getGQLAuthContextHTTP

▸ **getGQLAuthContextHTTP**(`req`): `Promise`<[`IGQLAuthContext`](models.IGQLAuthContext.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<[`IGQLAuthContext`](models.IGQLAuthContext.md)\>

#### Defined in

packages/convostack-auth/dist/index.d.ts:28

___

### getGQLAuthContextWS

▸ **getGQLAuthContextWS**(`connectionParams`): `Promise`<[`IGQLAuthContext`](models.IGQLAuthContext.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionParams` | `Readonly`<`Record`<`string`, `unknown`\>\> |

#### Returns

`Promise`<[`IGQLAuthContext`](models.IGQLAuthContext.md)\>

#### Defined in

packages/convostack-auth/dist/index.d.ts:29

___

### login

▸ **login**(`req`, `params`): `Promise`<[`ISuccessfulAuthResponse`](auth.ISuccessfulAuthResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `params` | [`ILoginParams`](auth.ILoginParams.md) |

#### Returns

`Promise`<[`ISuccessfulAuthResponse`](auth.ISuccessfulAuthResponse.md)\>

#### Defined in

packages/convostack-auth/dist/index.d.ts:30

___

### refresh

▸ **refresh**(`req`, `params`): `Promise`<[`ISuccessfulAuthResponse`](auth.ISuccessfulAuthResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `params` | [`IRefreshParams`](auth.IRefreshParams.md) |

#### Returns

`Promise`<[`ISuccessfulAuthResponse`](auth.ISuccessfulAuthResponse.md)\>

#### Defined in

packages/convostack-auth/dist/index.d.ts:31
