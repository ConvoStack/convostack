import { RefreshAuthDocument, RefreshAuthMutation, LoginDocument, LoginMutation } from '@graphql';
import { GraphQLClient } from 'graphql-request';
import { RequestMiddleware } from 'graphql-request/src/types';
import { createClient } from 'graphql-ws';
import store from '../redux';
import { setAccessToken, setAccessTokenExpiry, setRefreshToken, setRefreshTokenExpiry } from '../redux/slice';
import { UserData } from '../types';

export const fetchTokens = async (graphqlUrl?: string, workspaceId?: string, userData?: UserData) => {
  const { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry } = store.getState().conversation;
  if (!userData) userData = store.getState().conversation.userData;
  if (!graphqlUrl) graphqlUrl = store.getState().conversation.graphqlUrl;
  if (!workspaceId) workspaceId = store.getState().conversation.workspaceId;
  const tempApiClient = new GraphQLClient(graphqlUrl);
  if (workspaceId) {
    tempApiClient.setHeader("X-Workspace-Id", workspaceId)
  }
  const currentTime = Date.now();

  if (!accessToken || !refreshToken || (refreshTokenExpiry && currentTime > refreshTokenExpiry)) {
    try {
      const data: LoginMutation = await tempApiClient.request(LoginDocument,
        { email: userData?.email,
          name: userData?.name,
          hash: userData?.hash,
          externalId: userData?.userId
        }
      );
      const { accessToken, refreshToken } = data.login;
      store.dispatch(setAccessToken(accessToken.token));
      store.dispatch(setAccessTokenExpiry((accessToken.expAt * 1000)));
      store.dispatch(setRefreshToken(refreshToken.token));
      store.dispatch(setRefreshTokenExpiry((refreshToken.expAt * 1000)));
    } catch (error) {
      console.error(error);
    }
  } else if (accessTokenExpiry && currentTime > accessTokenExpiry) {
    try {
      const data: RefreshAuthMutation = await tempApiClient.request(RefreshAuthDocument, {
          refreshToken: refreshToken,
        });
      const { accessToken } = data.refreshAuth;
      store.dispatch(setAccessToken(accessToken.token));
      store.dispatch(setAccessTokenExpiry((accessToken.expAt * 1000)));
    } catch (error) {
      console.error(error);
    }
  }
}

export const createApiClient = () => {
  const authMiddleware: RequestMiddleware = async (request) => {
    let accessToken = store.getState().conversation.accessToken;
    const accessTokenExpiry = store.getState().conversation.accessTokenExpiry;
    const currentTime = Date.now();
    if (!accessToken || (accessTokenExpiry && currentTime + 60000 > accessTokenExpiry)) {
      fetchTokens().then(() => {
        accessToken = store.getState().conversation.accessToken;
      })
    }
    const workspaceId = store.getState().conversation.workspaceId;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
    }
    if (workspaceId) {
        headers["X-Workspace-Id"] = workspaceId
    }
    return {
      ...request,
      headers: { ...request.headers, ...headers },
    }
  };
  const graphqlUrl = store.getState().conversation.graphqlUrl;
  const apiClient = new GraphQLClient(graphqlUrl, { requestMiddleware: authMiddleware })
  return apiClient;
}

export const createWsClient = () => {
  const wsUrl = store.getState().conversation.websocketUrl;
  const workspaceId = store.getState().conversation.workspaceId;
  const wsClient = createClient({
    url: wsUrl,
    connectionParams: async () => {
      let accessToken = store.getState().conversation.accessToken;
      const accessTokenExpiry = store.getState().conversation.accessTokenExpiry;
      const currentTime = Date.now();
      if (!accessToken || (accessTokenExpiry && currentTime + 60000 > accessTokenExpiry)) {
        fetchTokens().then(() => {
          accessToken = store.getState().conversation.accessToken;
        })
      }
      const params: Record<string, string> = {
          Authorization: `Bearer ${accessToken}`,
      }
      if (workspaceId) {
          params["X-Workspace-Id"] = workspaceId
      }
      return params;
    },
  })
  return wsClient;
}
