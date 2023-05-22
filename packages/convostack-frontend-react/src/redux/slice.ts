import { createSlice } from '@reduxjs/toolkit';
import { CustomStyling, UserData } from '../types/CustomStyling';

export interface ConvoStackState {
  graphqlUrl: string;
  websocketUrl: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: number | null;
  refreshTokenExpiry: number | null;
  activeConversationId: string | null;
  context: { [key: string]: string } | null;
  agent: string | null;
  isConversationWindowVisible: boolean;
  isConversationListVisible: boolean;
  styling: CustomStyling | null;
  userData: UserData | undefined;
  data: any;
  embedActiveConversationId: { [key: string]: string | null };
  embedIsConversationListVisible: { [key: string]: boolean }; 
  embedData: { [key: string]: any };
  createdFirstConversation: boolean;
}

const initialState: ConvoStackState = {
  graphqlUrl: "",
  websocketUrl: "",
  accessToken: "",
  refreshToken: "",
  accessTokenExpiry: null,
  refreshTokenExpiry: null,
  activeConversationId: null,
  context: null,
  agent: null,
  isConversationWindowVisible: false,
  isConversationListVisible: true,
  styling: null,
  userData: undefined,
  data: null,
  embedActiveConversationId: {},
  embedIsConversationListVisible: {},
  embedData: {},
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
    setShowConversationWindow(state, action) {
      state.isConversationWindowVisible = action.payload;
    },
    setIsConversationListVisible(state, action) {
      state.isConversationListVisible = action.payload;
    },
    setAgent(state, action) {
      state.agent = action.payload;
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
      const { key, value } = action.payload
      state.embedActiveConversationId[key] = value
    },
    setEmbedIsConversationListVisible(state, action) {
      const { key, value } = action.payload
      state.embedIsConversationListVisible[key] = value
    },
    setEmbedData(state, action) {
      const { key, value } = action.payload
      state.embedData[key] = value
    },
    setCreatedFirstConversation(state, action) {
      state.createdFirstConversation = action.payload 
    }
  },
});

export const { 
  setGraphqlUrl, 
  setWebsocketlUrl, 
  setAccessToken,
  setRefreshToken,
  setAccessTokenExpiry,
  setRefreshTokenExpiry,
  setConversationId, 
  setContext, 
  setShowConversationWindow, 
  setIsConversationListVisible, 
  setAgent, 
  setStyling, 
  setUserData,
  setData,
  setEmbedConversationId,
  setEmbedIsConversationListVisible,
  setEmbedData,
  setCreatedFirstConversation
} = conversationSlice.actions;

export default conversationSlice.reducer;