import { useEffect, useState } from "react";
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

interface EmbedChatProps {
  id: string;
}

const EmbedChat: React.FC<EmbedChatProps> = ({ id }) => {
  const { graphqlUrl } = useConvoStack();
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const dispatch = useDispatch();
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
  return (
    <div className="h-64 w-[400px]">
      {graphqlUrl === "" ? (
        <Loader />
      ) : !embedIsConversationListVisible && embedActiveConversationId ? (
        <>
          <Header id={id} />
          <MessageList
            isAgentTyping={isAgentTyping}
            setIsAgentTyping={setIsAgentTyping}
            data={embedData}
          />
          <UserInput
            isAgentTyping={isAgentTyping}
            activeConversationId={embedActiveConversationId}
          />
        </>
      ) : (
        <ConversationList id={id} />
      )}
    </div>
  );
};

export default EmbedChat;
