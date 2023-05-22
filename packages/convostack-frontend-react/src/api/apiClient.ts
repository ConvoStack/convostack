import { RefreshAuthDocument, RefreshAuthMutation, LoginDocument, LoginMutation } from '@graphql';
import { GraphQLClient } from 'graphql-request';
import { RequestMiddleware } from 'graphql-request/src/types';
import { createClient } from 'graphql-ws';
import store from '../redux';
import { setAccessToken, setAccessTokenExpiry, setRefreshToken, setRefreshTokenExpiry } from '../redux/slice';
import { UserData } from '../types/CustomStyling';

export const fetchTokens = async (graphqlUrl?: string, userData?: UserData) => {
  const { accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry } = store.getState().conversation;
  if (!userData) userData = store.getState().conversation.userData;
  if (!graphqlUrl) graphqlUrl = store.getState().conversation.graphqlUrl;
  const tempApiClient = new GraphQLClient(graphqlUrl);
  const currentTime = Date.now();
  if (!accessToken || !refreshToken || (refreshTokenExpiry && currentTime > refreshTokenExpiry)) {
    try {
      const data: LoginMutation = await tempApiClient.request(LoginDocument, userData);
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
      console.log('AAAA')
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
      console.log('BBBBB')
      fetchTokens().then(() => {
        accessToken = store.getState().conversation.accessToken;
      })
    }
    return {
      ...request,
      headers: { ...request.headers, Authorization: `Bearer ${accessToken}` },
    }
  };
  const graphqlUrl = store.getState().conversation.graphqlUrl;
  const apiClient = new GraphQLClient(graphqlUrl, { requestMiddleware: authMiddleware })
  return apiClient;
}

export const createWsClient = () => {
  const wsUrl = store.getState().conversation.websocketUrl;
  const wsClient = createClient({
    url: wsUrl,
    connectionParams: async () => {
      let accessToken = store.getState().conversation.accessToken;
      const accessTokenExpiry = store.getState().conversation.accessTokenExpiry;
      const currentTime = Date.now();
      if (!accessToken || (accessTokenExpiry && currentTime + 60000 > accessTokenExpiry)) {
        console.log('CCCCC')
        fetchTokens().then(() => {
          accessToken = store.getState().conversation.accessToken;
        })
      }
      return {
        Authorization: `Bearer ${accessToken}`,
      };
    },
  })
  return wsClient;
}
