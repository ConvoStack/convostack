import { MutableRefObject, useEffect, useRef, useState } from "react";
import LoaderSpinner from "../LoaderSpinner";
import Message, { MessageProps } from "../Message";

interface MessageSent {
  content: string;
  role: string;
}

interface MessageListProps {
  isAgentTyping: boolean;
  setIsAgentTyping: (arg: boolean) => void;
  data: any;
  style: React.CSSProperties;
  CustomMessage?: React.ComponentType<MessageProps>;
}

const MessageList: React.FC<MessageListProps> = ({
  isAgentTyping,
  setIsAgentTyping,
  data,
  style,
  CustomMessage,
}) => {
  const MessageComponentToRender = CustomMessage ? CustomMessage : Message;
  const [width, setWidth] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (data !== null) {
      onNext(data);
    } else {
      setIsLoading(true);
      setConversationEvents([]);
    }
  }, [data]);

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

  useEffect(() => {
    const getWidth = () => {
      if (outerDiv.current) {
        const newWidth =
          outerDiv.current.getBoundingClientRect().width.toString() + "px";
        width !== newWidth && setWidth(newWidth);
      }
    };
    getWidth();
    typeof window !== "undefined" &&
      window.addEventListener("resize", getWidth);
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", getWidth);
    };
  }, []);

  return (
    <div ref={outerDiv} className="bg-white h-full overflow-auto" style={style}>
      <div ref={innerDiv} className="flex flex-col">
        {isLoading ? (
          <LoaderSpinner className="mx-auto mt-12 z-0" />
        ) : (
          <>
            {conversationEvents.map(
              (message, index) =>
                message.content && (
                  <MessageComponentToRender
                    key={index}
                    width={width}
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
              <MessageComponentToRender
                width={width}
                message={{ text: streams.join(""), author: "AI" }}
                className={"mb-3"}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageList;
