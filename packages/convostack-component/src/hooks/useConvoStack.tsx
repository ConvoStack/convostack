import { UpdateConversationContextDocument } from "@graphql";
import { useDispatch, useSelector } from "react-redux";
import { createApiClient } from "../api/apiClient";
import {
  setConversationId,
  setContext,
  setShowConversationWindow,
  setisConversationListVisible,
  setAgent,
  setIsCreatingNewConversation,
  ConvoStackState,
} from "../redux/slice";

const useConvoStack = () => {
  const dispatch = useDispatch();
  const {
    graphqlUrl,
    websocketUrl,
    activeConversationId,
    isConversationWindowVisible,
    isConversationListVisible,
    agent,
    context,
    isCreatingNewConversation,
    styling,
    userData,
  } = useSelector((state: any) => state.conversation as ConvoStackState);

  const toggleWidget = (arg: boolean) => {
    dispatch(setShowConversationWindow(arg));
  };

  const openConversation = (
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
    dispatch(setisConversationListVisible(false));
    dispatch(setShowConversationWindow(true));
  };

  const openConversationList = () => {
    dispatch(setisConversationListVisible(true));
    dispatch(setShowConversationWindow(true));
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

  return {
    graphqlUrl,
    websocketUrl,
    agent,
    context,
    styling,
    userData,
    activeConversationId,
    isConversationWindowVisible,
    isConversationListVisible,
    isCreatingNewConversation,
    toggleWidget,
    openConversation,
    setActiveConversationId,
    openConversationList,
    updateContext,
  };
};

export default useConvoStack;
