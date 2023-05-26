import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useConvoStack from "../../hooks/useConvoStack";
import Loader from "../Loader";
import UserInput from "./UserInput";
import ConversationList from "./ConversationList";
import Header from "./Header";
import MessageList from "./MessageList";
import { useDispatch } from "react-redux";
import {
  setEmbedConversationId,
  setEmbedData,
  setEmbedIsConversationListVisible,
} from "../../redux/slice";
import { CustomEmbedStyling } from "../../types/CustomStyling";
import { MessageProps } from "../Message";

interface EmbedChatProps {
  id: string;
  customStyling?: CustomEmbedStyling;
  CustomMessage?: React.ComponentType<MessageProps>;
}

const EmbedChat: React.FC<EmbedChatProps> = ({
  id,
  customStyling,
  CustomMessage,
}) => {
  const { graphqlUrl } = useConvoStack();
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const dispatch = useDispatch();
  const outerDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [height, setHeight] = useState<null | string>(null);
  useEffect(() => {
    dispatch(setEmbedConversationId({ key: id, value: null }));
    dispatch(setEmbedIsConversationListVisible({ key: id, value: true }));
    dispatch(setEmbedData({ key: id, value: null }));
  }, [id]);

  const embedActiveConversationId = useSelector(
    (state: any) => state.conversation.embedActiveConversationId[id]
  );
  const embedIsConversationListVisible = useSelector(
    (state: any) => state.conversation.embedIsConversationListVisible[id]
  );
  const embedData = useSelector(
    (state: any) => state.conversation.embedData[id]
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
      className={`max-sm:max-w-[100vw]`}
      style={{
        width: customStyling?.embedWidth || "400px",
        height: customStyling?.embedHeight || "400px",
      }}
    >
      {graphqlUrl === "" ? (
        <Loader />
      ) : !embedIsConversationListVisible ? (
        <div className="flex flex-col">
          <Header id={id} customStyling={customStyling} />
          <MessageList
            style={{ height: `calc(${height} - 112px` }}
            isAgentTyping={isAgentTyping}
            setIsAgentTyping={setIsAgentTyping}
            data={embedData}
            CustomMessage={CustomMessage}
          />
          <UserInput
            isAgentTyping={isAgentTyping}
            activeConversationId={embedActiveConversationId}
          />
        </div>
      ) : (
        <ConversationList
          id={id}
          style={{ height: `calc(${height} - 56px` }}
          customStyling={customStyling}
        />
      )}
    </div>
  );
};

export default EmbedChat;
