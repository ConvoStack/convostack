import { UpdateConversationContextDocument } from "@graphql";
import { useDispatch, useSelector } from "react-redux";
import { createApiClient } from "../api/apiClient";
import {
  setGraphqlUrl,
  setWebsocketlUrl,
  setConversationId,
  setContext,
  setShowConversationWindow,
  setShowConversationList,
  setAgent,
  setIsCreatingNewConversation,
  setStyling,
  ConvoStackState,
  setUserData,
} from "../redux/slice";
import { CustomStyling, UserData } from "../types/CustomStyling";

const useConvoStack = () => {
  const dispatch = useDispatch();
  const {
    graphqlUrl,
    websocketUrl,
    activeConversationId,
    isConversationWindowVisible,
    showConversationList,
    agent,
    context,
    isCreatingNewConversation,
    styling,
    userData,
  } = useSelector((state: any) => state.conversation as ConvoStackState);

  const setGqllUrl = (url: string) => {
    dispatch(setGraphqlUrl(url));
  };

  const setWsUrl = (url: string) => {
    dispatch(setWebsocketlUrl(url));
  };

  const setIsConversationWindowVisible = (arg: boolean) => {
    dispatch(setShowConversationWindow(arg));
  };

  const setCreatingNewConversation = (arg: boolean) => {
    dispatch(setIsCreatingNewConversation(arg));
  };

  const openChatWindow = (
    conversationId: string | null,
    agent?: string | null,
    context?: { [key: string]: string }
  ) => {
    if (conversationId === null) {
      dispatch(setIsCreatingNewConversation(true));
    } else {
      dispatch(setConversationId(conversationId));
    }
    if (agent) {
      dispatch(setAgent(agent));
    }
    if (context) {
      dispatch(setContext(context));
    }
    dispatch(setShowConversationList(false));
    dispatch(setShowConversationWindow(true));
  };

  const openConversationListWindow = () => {
    dispatch(setShowConversationList(true));
    dispatch(setShowConversationWindow(true));
  };

  const closeConversationWindow = () => {
    dispatch(setShowConversationWindow(false));
  };

  const setActiveConversationId = (
    conversationId: string | null,
    context?: { [key: string]: string }
  ) => {
    dispatch(setConversationId(conversationId));
    if (context) {
      dispatch(setContext(context));
    }
  };

  const showConversationListHelper = (arg: boolean) => {
    dispatch(setShowConversationList(arg));
  };

  const updateContext = async (
    conversationId: string,
    context: { [key: string]: string }
  ) => {
    await createApiClient(graphqlUrl, userData).request(
      UpdateConversationContextDocument,
      {
        conversationId: conversationId,
        context: context,
      }
    );
  };

  const applyStyling = (styling: CustomStyling) => {
    dispatch(setStyling(styling));
  };

  const saveUserData = (userData: UserData) => {
    dispatch(setUserData(userData));
  };

  return {
    graphqlUrl,
    websocketUrl,
    activeConversationId,
    isConversationWindowVisible,
    showConversationList,
    agent,
    context,
    isCreatingNewConversation,
    styling,
    userData,
    setGqllUrl,
    setWsUrl,
    setIsConversationWindowVisible,
    openChatWindow,
    setActiveConversationId,
    closeConversationWindow,
    showConversationListHelper,
    openConversationListWindow,
    setCreatingNewConversation,
    updateContext,
    applyStyling,
    saveUserData,
  };
};

export default useConvoStack;
