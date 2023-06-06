import { createSlice } from '@reduxjs/toolkit';
import { CustomStyling, UserData } from '../types';

export interface ConvoStackState {
  graphqlUrl: string;
  websocketUrl: string;
  workspaceId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: number | null;
  refreshTokenExpiry: number | null;
  activeConversationId: string | null;
  context: { [key: string]: string } | null;
  defaultAgent: string | null;
  isWidgetWindowVisible: boolean;
  isConversationListVisible: boolean;
  styling: CustomStyling | null;
  userData: UserData | undefined;
  data: any;
  embedActiveConversationId: { [embedId: string]: string | null };
  isEmbedConversationListVisible: { [embedId: string]: boolean }; 
  embedData: { [embedId: string]: any };
  embedDefaultAgent: { [embedId: string]: string | null };
  createdFirstConversation: boolean;
}

const initialState: ConvoStackState = {
  graphqlUrl: "",
  websocketUrl: "",
  workspaceId: "",
  accessToken: "",
  refreshToken: "",
  accessTokenExpiry: null,
  refreshTokenExpiry: null,
  activeConversationId: null,
  context: null,
  defaultAgent: null,
  isWidgetWindowVisible: false,
  isConversationListVisible: true,
  styling: null,
  userData: undefined,
  data: null,
  embedActiveConversationId: {},
  isEmbedConversationListVisible: {},
  embedData: {},
  embedDefaultAgent: {},
  createdFirstConversation: false,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setGraphqlUrl(state, action) {
      state.graphqlUrl = action.payload;
    },
    setWebsocketlUrl(state, action) {
      state.websocketUrl = action.payload;
    },
    setWorkspaceId(state, action) {
      state.workspaceId = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setAccessTokenExpiry(state, action) {
      state.accessTokenExpiry = action.payload;
    },
    setRefreshTokenExpiry(state, action) {
      state.refreshTokenExpiry = action.payload;
    },
    setConversationId(state, action) {
      state.activeConversationId = action.payload;
    },
    setContext(state, action) {
      state.context = action.payload;
    },
    setShowWidgetWindow(state, action) {
      state.isWidgetWindowVisible = action.payload;
    },
    setIsConversationListVisible(state, action) {
      state.isConversationListVisible = action.payload;
    },
    setDefaultAgent(state, action) {
      state.defaultAgent = action.payload;
    },
    setStyling(state, action) {
      state.styling = action.payload
    },
    setUserData(state, action) {
      state.userData = action.payload
    },
    setData(state, action) {
      state.data = action.payload
    },
    setEmbedConversationId(state, action) {
      const { embedId, value } = action.payload
      state.embedActiveConversationId[embedId] = value
    },
    setIsEmbedConversationListVisible(state, action) {
      const { embedId, value } = action.payload
      state.isEmbedConversationListVisible[embedId] = value
    },
    setEmbedData(state, action) {
      const { embedId, value } = action.payload
      state.embedData[embedId] = value
    },
    setEmbedDefaultAgent(state, action) {
      const { embedId, value } = action.payload
      state.embedDefaultAgent[embedId] = value
    },
    setCreatedFirstConversation(state, action) {
      state.createdFirstConversation = action.payload 
    }
  },
});

export const { 
  setGraphqlUrl, 
  setWebsocketlUrl,
  setWorkspaceId,
  setAccessToken,
  setRefreshToken,
  setAccessTokenExpiry,
  setRefreshTokenExpiry,
  setConversationId, 
  setContext, 
  setShowWidgetWindow, 
  setIsConversationListVisible, 
  setDefaultAgent, 
  setStyling, 
  setUserData,
  setData,
  setEmbedConversationId,
  setIsEmbedConversationListVisible,
  setEmbedData,
  setEmbedDefaultAgent,
  setCreatedFirstConversation
} = conversationSlice.actions;

export default conversationSlice.reducer;