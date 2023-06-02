import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import UserInput from "./UserInput";
import ConversationList from "./ConversationList";
import Header from "./Header";
import MessageList from "./MessageList";
import { useDispatch } from "react-redux";
import {
  ConvoStackState,
  setEmbedConversationId,
  setEmbedData,
  setEmbedDefaultAgent,
  setIsEmbedConversationListVisible,
} from "../../redux/slice";
import { CustomEmbedStyling } from "../../types";
import { MessageProps } from "../Message";

export interface ConvoStackEmbedProps {
  embedId: string;
  defaultAgent?: string | null;
  customStyling?: CustomEmbedStyling;
  CustomMessage?: React.ComponentType<MessageProps>;
}

const ConvoStackEmbed: React.FC<ConvoStackEmbedProps> = ({
  embedId,
  defaultAgent,
  customStyling,
  CustomMessage,
}) => {
  const { graphqlUrl } = useSelector(
    (state: any) => state.conversation as ConvoStackState
  );
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const dispatch = useDispatch();
  const outerDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [height, setHeight] = useState<null | string>(null);
  const [isAgentMessageLoading, setIsAgentMessageLoading] = useState(false);

  useEffect(() => {
    dispatch(setEmbedConversationId({ embedId: embedId, value: null }));
    dispatch(
      setIsEmbedConversationListVisible({ embedId: embedId, value: true })
    );
    dispatch(setEmbedData({ embedId: embedId, value: null }));
    dispatch(setEmbedDefaultAgent({ embedId: embedId, value: defaultAgent }));
  }, [embedId]);

  useEffect(() => {
    dispatch(setEmbedDefaultAgent({ embedId: embedId, value: defaultAgent }));
  }, [embedId, defaultAgent]);

  const embedActiveConversationId = useSelector(
    (state: any) => state.conversation.embedActiveConversationId[embedId]
  );
  const isEmbedConversationListVisible = useSelector(
    (state: any) => state.conversation.isEmbedConversationListVisible[embedId]
  );
  const embedData = useSelector(
    (state: any) => state.conversation.embedData[embedId]
  );

  useEffect(() => {
    const getHeight = () => {
      if (outerDiv.current) {
        const newHeight =
          outerDiv.current.getBoundingClientRect().height.toString() + "px";
        height !== newHeight && setHeight(newHeight);
      }
    };
    getHeight();
    typeof window !== "undefined" &&
      window.addEventListener("resize", getHeight);
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", getHeight);
    };
  }, []);

  return (
    <div
      ref={outerDiv}
      className="convostack overflow-hidden"
      style={{
        width: customStyling?.embedWidth || "auto",
        height: customStyling?.embedHeight || "400px",
        flex: customStyling?.embedFlex || "",
      }}
    >
      {graphqlUrl === "" ? (
        <Loader />
      ) : !isEmbedConversationListVisible ? (
        <div
          className="flex flex-col"
          style={{ height: customStyling?.embedHeight || "400px" }}
        >
          <Header embedId={embedId} customStyling={customStyling} />
          <MessageList
            style={{ height: `calc(${height} - 112px` }}
            isAgentTyping={isAgentTyping}
            setIsAgentTyping={setIsAgentTyping}
            data={embedData}
            CustomMessage={CustomMessage}
            isAgentMessageLoading={isAgentMessageLoading}
            setIsAgentMessageLoading={setIsAgentMessageLoading}
          />
          <UserInput
            embedId={embedId}
            isAgentTyping={isAgentTyping}
            activeConversationId={embedActiveConversationId}
            isAgentMessageLoading={isAgentMessageLoading}
            setIsAgentMessageLoading={setIsAgentMessageLoading}
          />
        </div>
      ) : (
        <ConversationList
          embedId={embedId}
          style={{ height: `calc(${height} - 56px` }}
          customStyling={customStyling}
        />
      )}
    </div>
  );
};

export default ConvoStackEmbed;
