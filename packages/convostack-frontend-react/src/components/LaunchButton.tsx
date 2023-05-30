import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { CustomIconsContext } from "../App";
import ArrowDownIcon from "../assets/ArrowDownIcon";
import ChatBubbleIcon from "../assets/ChatBubbleIcon";
import { ConvoStackState } from "../redux/slice";

interface LaunchButtonProps {
  onClickClose: () => void;
  isWidgetWindowVisible: boolean;
}

const LaunchButton: React.FC<LaunchButtonProps> = ({
  onClickClose,
  isWidgetWindowVisible,
}) => {
  const icons = useContext(CustomIconsContext);
  const { styling } = useSelector(
    (state: any) => state.conversation as ConvoStackState
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseReleased = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      onClickClose();
    }
    typeof document !== "undefined" &&
      document.removeEventListener("mouseup", handleMouseReleased);
  };

  typeof document !== "undefined" &&
    document.addEventListener("mouseup", handleMouseReleased);
  return (
    <button
      className={`z-50 fixed bottom-4 ${
        styling?.widgetLocation === "left"
          ? "left-3 sm:left-4"
          : "right-3 sm:right-4"
      } p-3 ${
        styling?.widgetLaunchButtonColor ? "" : "bg-blue-gradient"
      } text-white rounded-full hover:shadow-xl transition-shadow duration-200`}
      onMouseDown={handleMouseDown}
      style={{ backgroundColor: styling?.widgetLaunchButtonColor }}
    >
      <div style={{ pointerEvents: "none" }}>
        {!isWidgetWindowVisible
          ? icons?.widgetLaunchButtonOpenIcon || (
              <ChatBubbleIcon
                className={` ${
                  isMouseDown
                    ? "w-6 h-6 transform transition-all duration-200"
                    : "w-8 h-8 transform transition-all duration-400"
                }`}
                color={styling?.iconsColor}
              />
            )
          : icons?.widgetLaunchButtonCloseIcon || (
              <ArrowDownIcon
                className={` ${
                  isMouseDown
                    ? "w-6 h-6 pt-1 transform transition-all duration-200"
                    : "w-8 h-8 pt-1 transform transition-all duration-400"
                }`}
                color={styling?.iconsColor}
              />
            )}
      </div>
    </button>
  );
};

export default LaunchButton;
