import {
  SubscribeConversationEventsDocument,
  UpdateConversationContextDocument,
  SendMessageDocument,
} from "@graphql";
import { useDispatch, useSelector } from "react-redux";
import { createApiClient, createWsClient } from "../api/apiClient";
import {
  setConversationId,
  setContext,
  setShowWidgetWindow,
  setIsConversationListVisible,
  ConvoStackState,
  setData,
  setIsEmbedConversationListVisible,
  setEmbedConversationId,
  setEmbedData,
  setCreatedFirstConversation,
} from "../redux/slice";

interface CleanupFuncMap {
  [embedId: string]: (() => void) | undefined;
}
const cleanupFuncs: CleanupFuncMap = {};

const setCleanupFunc = (embedId: string, cleanup: () => void) => {
  cleanupFuncs[embedId] = cleanup;
};

const getCleanupFunc = (embedId: string) => {
  return cleanupFuncs[embedId];
};

const useConvoStack = () => {
  const dispatch = useDispatch();
  const {
    graphqlUrl,
    isWidgetWindowVisible,
    defaultAgent,
    context,
    activeConversationId,
    isConversationListVisible,
    isEmbedConversationListVisible,
    data,
    embedData,
    embedDefaultAgent,
    embedActiveConversationId,
  } = useSelector((state: any) => state.conversation as ConvoStackState);

  const toggleWidgetWindow = (arg: boolean): void => {
    if (activeConversationId && !isWidgetWindowVisible) {
      openConversation(activeConversationId);
    } else {
      dispatch(setShowWidgetWindow(arg));
    }
  };

  const openConversation = async (
    conversationId: string | null,
    agent?: string | null,
    context?: { [embedId: string]: string } | null,
    embedId?: string
  ): Promise<string> => {
    if (embedId) {
      dispatch(setEmbedData({ embedId: embedId, value: null }));
      dispatch(
        setIsEmbedConversationListVisible({ embedId: embedId, value: false })
      );
      dispatch(setCreatedFirstConversation(true));
    } else {
      dispatch(setData(null));
      dispatch(setIsConversationListVisible(false));
      dispatch(setShowWidgetWindow(true));
    }
    const fetchedCleanup = getCleanupFunc(embedId || "widget");
    fetchedCleanup && fetchedCleanup();
    while (graphqlUrl === "") {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for 100 milliseconds before checking again
    }
    const wsClient = createWsClient();
    wsClient.on("closed", (socket: any) => {
      if (!socket.wasClean) {
        if (embedId) {
          dispatch(setEmbedData({ embedId: embedId, value: null }));
        } else {
          dispatch(setData(null));
        }
        if (conversationId === null) {
          wsClient.dispose();
          if (embedId) {
            dispatch(
              setIsEmbedConversationListVisible({
                embedId: embedId,
                value: true,
              })
            );
          } else {
            dispatch(setIsConversationListVisible(true));
          }
        }
      }
    });
    const promise = new Promise<string>((resolve, reject) => {
      const selectedAgent = agent
        ? agent
        : embedId && embedDefaultAgent[embedId]
        ? embedDefaultAgent[embedId]
        : defaultAgent;
      const subscriptionCleanup = wsClient.subscribe(
        {
          query: SubscribeConversationEventsDocument,
          variables: {
            conversationId: conversationId,
            agent: selectedAgent,
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
              if (embedId) {
                dispatch(
                  setEmbedConversationId({
                    embedId: embedId,
                    value: generatedConvoId,
                  })
                );
              } else {
                dispatch(setConversationId(generatedConvoId));
              }
              resolve(generatedConvoId);
            }
            if (embedId) {
              dispatch(setEmbedData({ embedId: embedId, value: data }));
            } else {
              dispatch(setData(data));
            }
          },
          error: (error: any) => reject(error),
          complete: () => console.log("Subscription completed"),
        }
      );
      setCleanupFunc(embedId || "widget", subscriptionCleanup);
    });
    dispatch(setCreatedFirstConversation(true));
    return promise;
  };

  const openConversationList = (embedId?: string): void => {
    if (embedId) {
      dispatch(
        setIsEmbedConversationListVisible({ embedId: embedId, value: true })
      );
    } else {
      dispatch(setIsConversationListVisible(true));
      dispatch(setShowWidgetWindow(true));
    }
  };

  const dropSubscription = (embedId?: string): void => {
    const fetchedCleanup = getCleanupFunc(embedId || "widget");
    fetchedCleanup && fetchedCleanup();
  };

  const updateContext = async (
    conversationId: string,
    context: { [key: string]: string }
  ): Promise<void> => {
    while (graphqlUrl === "") {
      // Wait for graphqlUrl to be set
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    await createApiClient().request(UpdateConversationContextDocument, {
      conversationId: conversationId,
      context: context,
    });
    dispatch(setContext(context));
  };

  const sendMessage = async (
    message: string,
    conversationId: string | null,
    agent?: string,
    newContext?: {
      [key: string]: string;
    }
  ) => {
    await createApiClient().request(SendMessageDocument, {
      message: {
        content: message,
      },
      conversationId: conversationId || null,
      agent: agent || null,
      context: newContext || context,
    });
  };

  return {
    context,
    data,
    embedData,
    isWidgetWindowVisible,
    isConversationListVisible,
    isEmbedConversationListVisible,
    activeConversationId,
    embedActiveConversationId,
    toggleWidgetWindow,
    openConversation,
    openConversationList,
    updateContext,
    dropSubscription,
    sendMessage,
  };
};

export default useConvoStack;
