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

interface EmbedChatProps {
  id: string;
  customStyling?: CustomEmbedStyling;
}

const EmbedChat: React.FC<EmbedChatProps> = ({ id, customStyling }) => {
  const { graphqlUrl } = useConvoStack();
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const dispatch = useDispatch();
  const outerDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [height, setHeight] = useState<null | string>(null);
  useEffect(() => {
    dispatch(setEmbedConversationId({ key: id, value: null }));
    dispatch(setEmbedIsConversationListVisible({ key: id, value: false }));
    dispatch(setEmbedData({ key: id, value: null }));
  }, []);

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
    window.addEventListener("resize", getHeight);
    return () => {
      window.removeEventListener("resize", getHeight);
    };
  }, []);

  return (
    <div
      ref={outerDiv}
      className={`${customStyling?.embedHeight || "h-96"} ${
        customStyling?.embedWidth || "w-[400px]"
      } max-sm:max-w-[100vw]`}
    >
      {graphqlUrl === "" ? (
        <Loader />
      ) : !embedIsConversationListVisible && embedActiveConversationId ? (
        <div
          className={`${customStyling?.embedHeight || "h-96"} flex flex-col`}
        >
          <Header id={id} />
          <MessageList
            style={{ height: `calc(${height} - 112px` }}
            isAgentTyping={isAgentTyping}
            setIsAgentTyping={setIsAgentTyping}
            data={embedData}
          />
          <UserInput
            isAgentTyping={isAgentTyping}
            activeConversationId={embedActiveConversationId}
          />
        </div>
      ) : (
        <ConversationList id={id} style={{ height: `calc(${height} - 56px` }} />
      )}
    </div>
  );
};

export default EmbedChat;
