import { createSlice } from '@reduxjs/toolkit';
import { CustomStyling, UserData } from '../types/CustomStyling';

export interface ConvoStackState {
  graphqlUrl: string;
  websocketUrl: string;
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
}

const initialState: ConvoStackState = {
  graphqlUrl: "",
  websocketUrl: "",
  activeConversationId: null,
  context: null,
  agent: null,
  isConversationWindowVisible: false,
  isConversationListVisible: false,
  styling: null,
  userData: undefined,
  data: null,
  embedActiveConversationId: {},
  embedIsConversationListVisible: {},
  embedData: {}
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
    setConversationId(state, action) {
      state.activeConversationId = action.payload;
    },
    setContext(state, action) {
      state.context = action.payload;
    },
    setShowConversationWindow(state, action) {
      state.isConversationWindowVisible = action.payload;
    },
    setisConversationListVisible(state, action) {
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
    }
  },
});

export const { 
  setGraphqlUrl, 
  setWebsocketlUrl, 
  setConversationId, 
  setContext, 
  setShowConversationWindow, 
  setisConversationListVisible, 
  setAgent, 
  setStyling, 
  setUserData,
  setData,
  setEmbedConversationId,
  setEmbedIsConversationListVisible,
  setEmbedData
} = conversationSlice.actions;

export default conversationSlice.reducer;