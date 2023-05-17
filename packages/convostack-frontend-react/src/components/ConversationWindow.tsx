import { useState } from "react";
import useConvoStack from "../hooks/useConvoStack";
import ConversationList from "./ConversationList";
import Header from "./Header";
import MessageList from "./MessageList";
import UserInput from "./UserInput";

interface ConversationWindowProps {
  onClickClose: () => void;
}

const ConversationWindow: React.FC<ConversationWindowProps> = ({
  onClickClose,
}) => {
  const { activeConversationId, isConversationListVisible } = useConvoStack();
  const { styling } = useConvoStack();
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  return (
    <div
      className={`flex flex-col fixed  max-sm:top-0 max-sm:left-0 sm:bottom-[88px] ${
        styling?.widgetLocation === "left" ? "sm:left-4" : "sm:right-4"
      } ${styling?.widgetWindowWidth || "w-[370px]"} ${
        styling?.widgetWindowHeightOffset || "h-[calc(100vh-230px)]"
      } sm:shadow-xl sm:rounded-lg max-sm:w-full max-sm:h-full sm:max-w-[calc(100vw-32px)] sm:max-h-[calc(100vh-100px)]`}
    >
      {!isConversationListVisible && activeConversationId ? (
        <>
          <Header onClickClose={onClickClose} />
          <MessageList
            isAgentTyping={isAgentTyping}
            setIsAgentTyping={setIsAgentTyping}
          />
          <UserInput isAgentTyping={isAgentTyping} />
        </>
      ) : (
        <ConversationList onClickClose={onClickClose} />
      )}
    </div>
  );
};

export default ConversationWindow;
