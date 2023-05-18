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
  setIsConversationListVisible,
  setAgent,
  ConvoStackState,
  setData,
  setEmbedIsConversationListVisible,
  setEmbedConversationId,
  setEmbedData,
  setCreatedFirstConversation,
} from "../redux/slice";

interface CleanupFuncMap {
  [key: string]: (() => void) | undefined;
}
const cleanupFuncs: CleanupFuncMap = {};

const setCleanupFunc = (key: string, cleanup: () => void) => {
  cleanupFuncs[key] = cleanup;
};

const getCleanupFunc = (key: string) => {
  return cleanupFuncs[key];
};

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
    createdFirstConversation,
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
    context?: { [key: string]: string } | null,
    key?: string
  ): Promise<string> => {
    const fetchedCleanup = getCleanupFunc(key || "widget");
    fetchedCleanup && fetchedCleanup();
    if (key) {
      dispatch(setEmbedData({ key: key, value: null }));
      const promise = new Promise<string>((resolve, reject) => {
        const subscriptionCleanup = createWsClient(
          websocketUrl,
          graphqlUrl,
          userData
        ).subscribe(
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
                const generatedConvoId =
                  data.data?.subscribeConversationEvents.payload.id;
                dispatch(
                  setEmbedConversationId({
                    key: key,
                    value: generatedConvoId,
                  })
                );
                resolve(generatedConvoId);
              }
              dispatch(setEmbedData({ key: key, value: data }));
            },
            error: (error: any) => reject(error),
            complete: () => console.log("Subscription completed"),
          }
        );
        setCleanupFunc(key || "widget", subscriptionCleanup);
      });
      if (agent) {
        dispatch(setAgent(agent));
      }
      if (context) {
        dispatch(setContext(context));
      }
      dispatch(setEmbedIsConversationListVisible({ key: key, value: false }));
      dispatch(setCreatedFirstConversation(true));
      return promise;
    } else {
      dispatch(setData(null));
      const promise = new Promise<string>((resolve, reject) => {
        const subscriptionCleanup = createWsClient(
          websocketUrl,
          graphqlUrl,
          userData
        ).subscribe(
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
                const generatedConvoId =
                  data.data?.subscribeConversationEvents.payload.id;
                dispatch(setConversationId(generatedConvoId));
                resolve(generatedConvoId);
              }
              dispatch(setData(data));
            },
            error: (error: any) => reject(error),
            complete: () => console.log("Subscription completed"),
          }
        );
        setCleanupFunc(key || "widget", subscriptionCleanup);
      });
      if (agent) {
        dispatch(setAgent(agent));
      }
      if (context) {
        dispatch(setContext(context));
      }
      dispatch(setIsConversationListVisible(false));
      dispatch(setShowConversationWindow(true));
      dispatch(setCreatedFirstConversation(true));
      return promise;
    }
  };

  const openConversationList = (key?: string) => {
    if (key) {
      dispatch(setEmbedIsConversationListVisible({ key: key, value: true }));
    } else {
      dispatch(setIsConversationListVisible(true));
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
    dispatch(setContext(context));
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
    createdFirstConversation,
    toggleWidget,
    openConversation,
    setActiveConversationId,
    openConversationList,
    updateContext,
  };
};

export default useConvoStack;
