import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useConvoStack from "../hooks/useConvoStack";
import { ConvoStackState } from "../redux/slice";
import ConversationList from "./ConversationList";
import Header from "./Header";
import { MessageProps } from "./Message";
import MessageList from "./MessageList";
import UserInput from "./UserInput";

interface WidgetWindowProps {
  onClickClose: () => void;
  CustomMessage?: React.ComponentType<MessageProps>;
}

const WidgetWindow: React.FC<WidgetWindowProps> = ({
  onClickClose,
  CustomMessage,
}) => {
  const { isConversationListVisible } = useConvoStack();
  const { styling } = useSelector(
    (state: any) => state.conversation as ConvoStackState
  );
  const [width, setWidth] = useState("370px");
  const [height, setHeight] = useState("calc(100vh - 230px)");
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [isAgentMessageLoading, setIsAgentMessageLoading] = useState(false);
  useEffect(() => {
    const getWidthAndHeight = () => {
      const screenWidth =
        typeof window !== "undefined" ? window.innerWidth : 650;
      const width =
        screenWidth < 640 ? "100%" : styling?.widgetWindowWidth || "370px";
      const height =
        screenWidth < 640
          ? "100%"
          : styling?.widgetWindowHeightOffset || "calc(100vh - 230px)";
      setWidth(width);
      setHeight(height);
    };
    getWidthAndHeight();
    typeof window !== "undefined" &&
      window.addEventListener("resize", getWidthAndHeight);
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", getWidthAndHeight);
    };
  }, []);

  return (
    <div
      className={`z-50 flex flex-col fixed max-sm:top-0 max-sm:left-0 sm:bottom-[88px] ${
        styling?.widgetLocation === "left" ? "sm:left-4" : "sm:right-4"
      } sm:shadow-xl sm:rounded-lg max-sm:w-full max-sm:h-full`}
      style={{
        width: width,
        height: height,
      }}
    >
      {!isConversationListVisible ? (
        <>
          <Header onClickClose={onClickClose} />
          <MessageList
            isAgentTyping={isAgentTyping}
            setIsAgentTyping={setIsAgentTyping}
            CustomMessage={CustomMessage}
            isAgentMessageLoading={isAgentMessageLoading}
            setIsAgentMessageLoading={setIsAgentMessageLoading}
          />
          <UserInput
            isAgentTyping={isAgentTyping}
            isAgentMessageLoading={isAgentMessageLoading}
            setIsAgentMessageLoading={setIsAgentMessageLoading}
          />
        </>
      ) : (
        <ConversationList onClickClose={onClickClose} />
      )}
    </div>
  );
};

export default WidgetWindow;
