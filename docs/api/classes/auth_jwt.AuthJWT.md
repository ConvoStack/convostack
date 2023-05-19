[convostack - v0.0.15](../README.md) / [auth-jwt](../modules/auth_jwt.md) / AuthJWT

# Class: AuthJWT

[auth-jwt](../modules/auth_jwt.md).AuthJWT

## Implements

- [`IAuthProvider`](../interfaces/auth.IAuthProvider.md)

## Table of contents

### Constructors

- [constructor](auth_jwt.AuthJWT.md#constructor)

### Methods

- [getGQLAuthContextHTTP](auth_jwt.AuthJWT.md#getgqlauthcontexthttp)
- [getGQLAuthContextWS](auth_jwt.AuthJWT.md#getgqlauthcontextws)
- [login](auth_jwt.AuthJWT.md#login)
- [refresh](auth_jwt.AuthJWT.md#refresh)

## Constructors

### constructor

• **new AuthJWT**(`storage`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `storage` | [`IStorageEngine`](../interfaces/models.IStorageEngine.md) |
| `options` | [`IAuthJWTOptions`](../interfaces/auth_jwt.IAuthJWTOptions.md) |

#### Defined in

packages/convostack-auth-jwt/dist/index.d.ts:16

## Methods

### getGQLAuthContextHTTP

▸ **getGQLAuthContextHTTP**(`req`): `Promise`<[`IGQLAuthContext`](../interfaces/models.IGQLAuthContext.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<[`IGQLAuthContext`](../interfaces/models.IGQLAuthContext.md)\>

#### Implementation of

[IAuthProvider](../interfaces/auth.IAuthProvider.md).[getGQLAuthContextHTTP](../interfaces/auth.IAuthProvider.md#getgqlauthcontexthttp)

#### Defined in

packages/convostack-auth-jwt/dist/index.d.ts:18

___

### getGQLAuthContextWS

▸ **getGQLAuthContextWS**(`connectionParams`): `Promise`<[`IGQLAuthContext`](../interfaces/models.IGQLAuthContext.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionParams` | `Readonly`<`Record`<`string`, `unknown`\>\> |

#### Returns

`Promise`<[`IGQLAuthContext`](../interfaces/models.IGQLAuthContext.md)\>

#### Implementation of

[IAuthProvider](../interfaces/auth.IAuthProvider.md).[getGQLAuthContextWS](../interfaces/auth.IAuthProvider.md#getgqlauthcontextws)

#### Defined in

packages/convostack-auth-jwt/dist/index.d.ts:19

___

### login

▸ **login**(`req`, `«destructured»`): `Promise`<[`ISuccessfulAuthResponse`](../interfaces/auth.ISuccessfulAuthResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `«destructured»` | [`ILoginParams`](../interfaces/auth.ILoginParams.md) |

#### Returns

`Promise`<[`ISuccessfulAuthResponse`](../interfaces/auth.ISuccessfulAuthResponse.md)\>

#### Implementation of

[IAuthProvider](../interfaces/auth.IAuthProvider.md).[login](../interfaces/auth.IAuthProvider.md#login)

#### Defined in

packages/convostack-auth-jwt/dist/index.d.ts:20

___

### refresh

▸ **refresh**(`req`, `params`): `Promise`<[`ISuccessfulAuthResponse`](../interfaces/auth.ISuccessfulAuthResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `params` | [`IRefreshParams`](../interfaces/auth.IRefreshParams.md) |

#### Returns

`Promise`<[`ISuccessfulAuthResponse`](../interfaces/auth.ISuccessfulAuthResponse.md)\>

#### Implementation of

[IAuthProvider](../interfaces/auth.IAuthProvider.md).[refresh](../interfaces/auth.IAuthProvider.md#refresh)

#### Defined in

packages/convostack-auth-jwt/dist/index.d.ts:21
