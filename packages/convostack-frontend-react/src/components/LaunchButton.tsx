import { useContext, useState } from "react";
import { CustomIconsContext } from "../App";
import ArrowDownIcon from "../assets/ArrowDownIcon";
import ChatBubbleIcon from "../assets/ChatBubbleIcon";
import useConvoStack from "../hooks/useConvoStack";

interface LaunchButtonProps {
  onClickClose: () => void;
  isConversationWindowVisible: boolean;
}

const LaunchButton: React.FC<LaunchButtonProps> = ({
  onClickClose,
  isConversationWindowVisible,
}) => {
  const icons = useContext(CustomIconsContext);
  const { styling } = useConvoStack();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseReleased = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      onClickClose();
    }
    document.removeEventListener("mouseup", handleMouseReleased);
  };

  document.addEventListener("mouseup", handleMouseReleased);
  return (
    <button
      className={`fixed bottom-4 ${
        styling?.widgetLocation === "left" ? "sm:left-4" : "sm:right-4"
      } p-3 ${
        styling?.widgetLaunchButtonColor || "bg-blue-gradient"
      } text-white rounded-full hover:shadow-xl transition-shadow duration-200`}
      onMouseDown={handleMouseDown}
    >
      <div style={{ pointerEvents: "none" }}>
        {!isConversationWindowVisible
          ? icons?.widgetLaunchButtonOpenIcon || (
              <ChatBubbleIcon
                className={` ${
                  isMouseDown
                    ? "w-6 h-6 transform transition-all duration-200"
                    : "w-8 h-8 transform transition-all duration-400"
                }`}
              />
            )
          : icons?.widgetLaunchButtonCloseIcon || (
              <ArrowDownIcon
                className={` ${
                  isMouseDown
                    ? "w-6 h-6 pt-1 transform transition-all duration-200"
                    : "w-8 h-8 pt-1 transform transition-all duration-400"
                }`}
              />
            )}
      </div>
    </button>
  );
};

export default LaunchButton;
