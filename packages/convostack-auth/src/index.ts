import { IGQLAuthContext, IUser } from "@convostack/models";
import * as express from "express";

export interface ILoginParams {
  email?: string;
  name?: string;
  hash?: string;
  anonymousId?: string;
  externalId?: string;
}

export interface IAuthTokenData {
  token: string;
  expAt: number;
}

export interface ISuccessfulAuthResponse {
  accessToken: IAuthTokenData;
  anonymousId: string;
  refreshToken: IAuthTokenData;
  anonymous: boolean;
  email: string;
  name: string;
  userId: string;
}

export interface IRefreshParams {
  refreshToken: string;
}

export interface IAuthProvider {
  getGQLAuthContextHTTP(req: express.Request): Promise<IGQLAuthContext>;

  getGQLAuthContextWS(connectionParams: Readonly<Record<string, unknown>>): Promise<IGQLAuthContext>;

  login(req: express.Request, params: ILoginParams): Promise<ISuccessfulAuthResponse>;

  refresh(req: express.Request, params: IRefreshParams): Promise<ISuccessfulAuthResponse>;
}