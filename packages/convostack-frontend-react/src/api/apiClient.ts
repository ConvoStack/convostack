import { RefreshAuthDocument, RefreshAuthMutation, LoginDocument, LoginMutation } from '@graphql';
import { GraphQLClient } from 'graphql-request';
import { RequestMiddleware } from 'graphql-request/src/types';
import { createClient } from 'graphql-ws';
import { UserData } from '../types/CustomStyling';

const fetchTokens = async (graphqlUrl: string, userData: UserData | undefined ) => {
  const tempApiClient = new GraphQLClient(graphqlUrl);
  const accessToken = localStorage.getItem('accessTokenConvoStack')
  const refreshToken = localStorage.getItem('refreshTokenConvoStack')
  const accessTokenTime = localStorage.getItem('accessTokenExpiryConvoStack');
  const refreshTokenTime = localStorage.getItem('refreshTokenExpiryConvoStack');
  const userDataLocalStorage = localStorage.getItem('userDataConvoStack');
  const currentTime = Date.now();
  console.log(userDataLocalStorage !== JSON.stringify(userData))
  if (!accessToken || !refreshToken || currentTime > Number(refreshTokenTime) || userDataLocalStorage !== JSON.stringify(userData)) {
    try {
      const data: LoginMutation = await tempApiClient.request(LoginDocument, userData);
      const { accessToken, refreshToken } = data.login;
      localStorage.setItem("accessTokenConvoStack", accessToken.token);
      localStorage.setItem(
        "accessTokenExpiryConvoStack",
        (accessToken.expAt * 1000).toString()
      );
      localStorage.setItem("refreshTokenConvoStack", refreshToken.token);
      localStorage.setItem(
        "refreshTokenExpiryConvoStack",
        (refreshToken.expAt * 1000).toString()
      );
      localStorage.setItem("userDataConvoStack", JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  } else if (currentTime > Number(accessTokenTime)) {
    try {
      const data: RefreshAuthMutation = await tempApiClient.request(RefreshAuthDocument, {
          refreshToken: refreshToken,
        });
      const { accessToken } = data.refreshAuth;
      localStorage.setItem("accessTokenConvoStack", accessToken.token);
      localStorage.setItem(
        "accessTokenExpiryConvoStack",
        (accessToken.expAt * 1000).toString()
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export const createApiClient = (graphqlUrl: string, userData?: UserData | undefined) => {
  const authMiddleware: RequestMiddleware = async (request) => {
    let accessToken = localStorage.getItem('accessTokenConvoStack')
    await fetchTokens(graphqlUrl, userData);
    accessToken = localStorage.getItem('accessTokenConvoStack')
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
      let accessToken = localStorage.getItem('accessTokenConvoStack')
      await fetchTokens(graphqlUrl, userData);
      accessToken = localStorage.getItem('accessTokenConvoStack')
      return {
        Authorization: `Bearer ${accessToken}`,
      };
    },
  })
  return wsClient;
}
