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
  isCreatingNewConversation: boolean;
  styling: CustomStyling | null;
  userData: UserData | undefined
}

const initialState: ConvoStackState = {
  graphqlUrl: "",
  websocketUrl: "",
  activeConversationId: null,
  context: null,
  agent: null,
  isConversationWindowVisible: false,
  isConversationListVisible: false,
  isCreatingNewConversation: false,
  styling: null,
  userData: undefined,
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
    setIsCreatingNewConversation(state, action) {
      state.isCreatingNewConversation = action.payload;
    },
    setStyling(state, action) {
      state.styling = action.payload
    },
    setUserData(state, action) {
      state.userData = action.payload
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
  setIsCreatingNewConversation, 
  setStyling, 
  setUserData 
} = conversationSlice.actions;

export default conversationSlice.reducer;