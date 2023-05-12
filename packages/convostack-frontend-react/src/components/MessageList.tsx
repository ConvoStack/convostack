import { SubscribeConversationEventsDocument } from "@graphql";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createWsClient } from "../api/apiClient";
import useConvoStack from "../hooks/useConvoStack";
import { setIsCreatingNewConversation } from "../redux/slice";
import Message from "./Message";

interface MessageSent {
  content: string;
  role: string;
}

interface MessageListProps {
  isAgentTyping: boolean;
  setIsAgentTyping: (arg: boolean) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  isAgentTyping,
  setIsAgentTyping,
}) => {
  const {
    graphqlUrl,
    websocketUrl,
    activeConversationId,
    setActiveConversationId,
    agent,
    context,
    isCreatingNewConversation,
    userData,
  } = useConvoStack();
  const dispatch = useDispatch();
  const [conversationEvents, setConversationEvents] = useState<MessageSent[]>(
    []
  );
  const [streams, setStreams] = useState<string[]>([]);

  const onNext = (data: any) => {
    const conversationEvent = data.data?.subscribeConversationEvents as any;
    if (conversationEvent.kind === "message_part") {
      setStreams((prevStreams) => [
        ...prevStreams,
        conversationEvent.payload.chunk,
      ]);
    } else if (conversationEvent.kind === "message") {
      setConversationEvents((prevConversationEvents) => [
        ...prevConversationEvents,
        {
          content: conversationEvent.payload.content,
          role: conversationEvent.payload.role,
        },
      ]);
      setStreams([]);
    } else if (conversationEvent.kind === "conversation_metadata") {
      setConversationEvents((prevConversationEvents) => [
        ...prevConversationEvents,
        { content: conversationEvent.payload.primer, role: "AI" },
      ]);
      if (isCreatingNewConversation) {
        setActiveConversationId(conversationEvent.payload.id);
        dispatch(setIsCreatingNewConversation(false));
      }
    }
  };
  useEffect(() => {
    createWsClient(websocketUrl, graphqlUrl, userData).subscribe(
      {
        query: SubscribeConversationEventsDocument,
        variables: {
          conversationId: isCreatingNewConversation
            ? null
            : activeConversationId,
          agent: agent,
          context: context,
        },
      },
      {
        next: onNext,
        error: (error) => console.error("Subscription error:", error),
        complete: () => console.log("Subscription completed"),
      }
    );
  }, []);

  const outerDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const innerDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const prevInnerDivHeight = useRef<null | number>(null);

  useEffect(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;
    outerDiv.current.scrollTo({
      top: innerDivHeight - outerDivHeight,
      left: 0,
      behavior: "smooth",
    });

    prevInnerDivHeight.current = innerDivHeight;
  }, [conversationEvents, streams]);

  useEffect(() => {
    if (streams.length === 0 && isAgentTyping) {
      setIsAgentTyping(false);
    } else if (streams.length > 0 && !isAgentTyping) {
      setIsAgentTyping(true);
    }
  }, [streams.length]);

  return (
    <div ref={outerDiv} className="bg-white relative h-full overflow-scroll">
      <div ref={innerDiv} className="relative flex flex-col">
        {conversationEvents.map(
          (message, index) =>
            message.content && (
              <Message
                key={index}
                message={{ text: message.content, author: message.role }}
                className={
                  index === conversationEvents.length - 1 &&
                  streams.length === 0
                    ? "mb-3"
                    : ""
                }
              />
            )
        )}
        {streams.length !== 0 && (
          <Message
            message={{ text: streams.join(""), author: "AI" }}
            className={"mb-3"}
          />
        )}
      </div>
    </div>
  );
};

export default MessageList;
