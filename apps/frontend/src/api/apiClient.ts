import { RefreshAuthDocument, RefreshAuthMutation, LoginDocument, LoginMutation } from '@graphql';
import { GraphQLClient } from 'graphql-request';
import { RequestMiddleware } from 'graphql-request/src/types';
import { createClient } from 'graphql-ws';
import { UserData } from '../types/CustomStyling';

const fetchTokens = async (graphqlUrl: string, userData: UserData | undefined ) => {
  const tempApiClient = new GraphQLClient(graphqlUrl);
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const accessTokenTime = localStorage.getItem('accessTokenExpiry');
  const refreshTokenTime = localStorage.getItem('refreshTokenExpiry');
  const currentTime = Date.now();
  if (!accessToken || !refreshToken || currentTime > Number(refreshTokenTime)) {
    try {
      const data: LoginMutation = await tempApiClient.request(LoginDocument, userData);
      const { accessToken, refreshToken } = data.login;
      localStorage.setItem("accessToken", accessToken.token);
      localStorage.setItem(
        "accessTokenExpiry",
        (accessToken.expAt * 1000).toString()
      );
      localStorage.setItem("refreshToken", refreshToken.token);
      localStorage.setItem(
        "refreshTokenExpiry",
        (refreshToken.expAt * 1000).toString()
      );
    } catch (error) {
      console.error(error);
    }
  } else if (currentTime > Number(accessTokenTime)) {
    try {
      const data: RefreshAuthMutation = await tempApiClient.request(RefreshAuthDocument, {
          refreshToken: refreshToken,
        });
      const { accessToken } = data.refreshAuth;
      localStorage.setItem("accessToken", accessToken.token);
      localStorage.setItem(
        "accessTokenExpiry",
        (accessToken.expAt * 1000).toString()
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export const createApiClient = (graphqlUrl: string, userData?: UserData | undefined) => {
  const authMiddleware: RequestMiddleware = async (request) => {
    let accessToken = localStorage.getItem('accessToken')
    await fetchTokens(graphqlUrl, userData);
    accessToken = localStorage.getItem('accessToken')
    return {
      ...request,
      headers: { ...request.headers, Authorization: `Bearer ${accessToken}` },
    }
  };
  const apiClient = new GraphQLClient(graphqlUrl, { requestMiddleware: authMiddleware })
  return apiClient;
}

export const createWsClient = (wsUrl: string, graphqlUrl: string, userData?: UserData | undefined) => {
  const wsClient = createClient({
    url: wsUrl,
    connectionParams: async () => {
      let accessToken = localStorage.getItem('accessToken')
      await fetchTokens(graphqlUrl, userData);
      accessToken = localStorage.getItem('accessToken')
      return {
        Authorization: `Bearer ${accessToken}`,
      };
    },
  })
  return wsClient;
}
