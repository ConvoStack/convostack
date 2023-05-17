import {
  SubscribeConversationEventsDocument,
  UpdateConversationContextDocument,
} from "@graphql";
import { useDispatch, useSelector } from "react-redux";
import { createApiClient, createWsClient } from "../api/apiClient";
import {
  setConversationId,
  setContext,
  setShowConversationWindow,
  setisConversationListVisible,
  setAgent,
  ConvoStackState,
  setData,
  setEmbedIsConversationListVisible,
  setEmbedConversationId,
  setEmbedData,
} from "../redux/slice";

const useConvoStack = () => {
  const dispatch = useDispatch();
  const {
    graphqlUrl,
    websocketUrl,
    isConversationWindowVisible,
    styling,
    userData,
    agent,
    context,
    activeConversationId,
    isConversationListVisible,
    data,
  } = useSelector((state: any) => state.conversation as ConvoStackState);
  const toggleWidget = (arg: boolean) => {
    if (activeConversationId && !isConversationWindowVisible) {
      openConversation(activeConversationId);
    } else {
      dispatch(setShowConversationWindow(arg));
    }
  };

  const openConversation = (
    conversationId: string | null,
    agent?: string | null,
    context?: { [key: string]: string },
    key?: string
  ) => {
    if (key) {
      dispatch(setEmbedData({ key: key, value: null }));
      createWsClient(websocketUrl, graphqlUrl, userData).subscribe(
        {
          query: SubscribeConversationEventsDocument,
          variables: {
            conversationId: conversationId,
            agent: agent,
            context: context,
          },
        },
        {
          next: (data: any) => {
            if (
              data.data?.subscribeConversationEvents.kind ===
              "conversation_metadata"
            ) {
              dispatch(
                setEmbedConversationId({
                  key: key,
                  value: data.data?.subscribeConversationEvents.payload.id,
                })
              );
            }
            dispatch(setEmbedData({ key: key, value: data }));
          },
          error: (error: any) => console.error("Subscription error:", error),
          complete: () => console.log("Subscription completed"),
        }
      );
      if (agent) {
        dispatch(setAgent(agent));
      }
      if (context) {
        dispatch(setContext(context));
      }
      dispatch(setEmbedIsConversationListVisible({ key: key, value: false }));
    } else {
      dispatch(setData(null));
      createWsClient(websocketUrl, graphqlUrl, userData).subscribe(
        {
          query: SubscribeConversationEventsDocument,
          variables: {
            conversationId: conversationId,
            agent: agent,
            context: context,
          },
        },
        {
          next: (data: any) => {
            if (
              data.data?.subscribeConversationEvents.kind ===
              "conversation_metadata"
            ) {
              dispatch(
                setConversationId(
                  data.data?.subscribeConversationEvents.payload.id
                )
              );
            }
            dispatch(setData(data));
          },
          error: (error: any) => console.error("Subscription error:", error),
          complete: () => console.log("Subscription completed"),
        }
      );
      if (agent) {
        dispatch(setAgent(agent));
      }
      if (context) {
        dispatch(setContext(context));
      }
      dispatch(setisConversationListVisible(false));
      dispatch(setShowConversationWindow(true));
    }
  };

  const openConversationList = (key?: string) => {
    if (key) {
      dispatch(setEmbedIsConversationListVisible({ key: key, value: true }));
    } else {
      dispatch(setisConversationListVisible(true));
      dispatch(setShowConversationWindow(true));
    }
  };

  const setActiveConversationId = (
    conversationId: string | null,
    context?: { [key: string]: string },
    key?: string
  ) => {
    if (key) {
      dispatch(setEmbedConversationId({ key: key, value: conversationId }));
    } else {
      dispatch(setConversationId(conversationId));
    }
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
    data,
    toggleWidget,
    openConversation,
    setActiveConversationId,
    openConversationList,
    updateContext,
  };
};

export default useConvoStack;
