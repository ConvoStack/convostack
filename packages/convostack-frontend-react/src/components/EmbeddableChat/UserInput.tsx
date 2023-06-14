import { useSendMessageMutation } from "@graphql";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createApiClient } from "../../api/apiClient";
import { CustomIconsContext } from "../../App";
import SendMessageIcon from "../../assets/SendMessageIcon";
import useConvoStack from "../../hooks/useConvoStack";
import ThreeDotsAnimation from "../../lottieAnimations/ThreeDotsAnimation";
import { ConvoStackState } from "../../redux/slice";

interface UserInputProps {
  embedId: string;
  isAgentTyping: boolean;
  activeConversationId: string | null;
  isAgentMessageLoading: boolean;
  setIsAgentMessageLoading: (arg: boolean) => void;
}

const UserInput: React.FC<UserInputProps> = ({
  embedId,
  isAgentTyping,
  activeConversationId,
  isAgentMessageLoading,
  setIsAgentMessageLoading,
}) => {
  const icons = useContext(CustomIconsContext);
  const { context } = useConvoStack();
  const { embedDefaultAgent, defaultAgent } = useSelector(
    (state: any) => state.conversation as ConvoStackState
  );
  const { mutate: sendMessageMutation } = useSendMessageMutation(
    createApiClient()
  );
  const [isMessageSent, setIsMessageSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendMessage = async (message: string) => {
    await sendMessageMutation({
      message: {
        content: message,
      },
      conversationId: activeConversationId,
      agent: embedDefaultAgent[embedId] || defaultAgent,
      context: context,
    });
    setIsMessageSent(true);
  };
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!isAgentMessageLoading) {
      await sendMessage(inputValue);
      setInputValue("");
      setIsAgentMessageLoading(true);
      event.preventDefault();
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (isAgentTyping || !inputValue)) {
      event.preventDefault();
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
      if (textarea !== null) textarea.style.height = "auto";
    }
  };
  const handleButtonSubmit = async (inputValue: string) => {
    if (!inputValue || isAgentTyping) return null;
    if (!isAgentMessageLoading) {
      console.log("hit");
      await sendMessage(inputValue);
      setInputValue("");
      setIsAgentMessageLoading(true);
    }
    if (textarea !== null) textarea.style.height = "auto";
  };
  const textarea: HTMLTextAreaElement | null =
    typeof document !== "undefined"
      ? document.querySelector("#userInput")
      : null;

  if (textarea) {
    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }

  useEffect(() => {
    if (isMessageSent) {
      const screenWidth =
        typeof window !== "undefined" ? window.innerWidth : 650;
      if (screenWidth < 640) {
        textareaRef?.current?.blur();
      }
      setIsMessageSent(false);
    }
  }, [isMessageSent]);

  return (
    <div className="border-t-1">
      <div className="w-full min-h-14 bg-off-white flex items-center max-h-36 scrollbar-hidden py-4">
        <textarea
          id="userInput"
          placeholder="Send a message..."
          ref={textareaRef}
          value={inputValue}
          onChange={handleChange}
          rows={1}
          className="font-sans h-auto px-4 max-h-36 w-full bg-off-white text-slate-500 scrollbar-hidden resize-none focus:outline-none focus:ring-blue-400 focus:ring-0"
          onKeyDown={handleKeyDown}
        />
        {isAgentTyping ? (
          <ThreeDotsAnimation className="mr-2 w-10 h-10 -mb-6 items-center" />
        ) : (
          <button
            onClick={() => handleButtonSubmit(inputValue)}
            className="bg-transparent"
          >
            {icons?.sendMessageIcon || (
              <SendMessageIcon className="h-6 w-6 mr-2" color="black" />
            )}
          </button>
        )}
      </div>
      <p className="font-sans text-center text-xs text-gray-400 bg-neutral-200">
        Powered by{" "}
        <a
          href="https://convostack.ai"
          target="_blank"
          className="font-semibold"
        >
          ConvoStack.ai
        </a>
      </p>
    </div>
  );
};

export default UserInput;
