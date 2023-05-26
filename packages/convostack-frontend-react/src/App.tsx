import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ConversationWindow from "./components/ConversationWindow";
import LaunchButton from "./components/LaunchButton";
import { ConvoStackWrapperProps } from "./ConvoStackWrapper";
import useConvoStack from "./hooks/useConvoStack";
import {
  setAgent,
  setGraphqlUrl,
  setStyling,
  setUserData,
  setWebsocketlUrl,
} from "./redux/slice";
import { CustomIcons } from "./types/CustomStyling";

export const CustomIconsContext = createContext<CustomIcons | undefined>(
  undefined
);

const App: React.FC<Omit<ConvoStackWrapperProps, "children">> = ({
  graphqlUrl,
  websocketUrl,
  userData,
  customStyling,
  icons,
  defaultAgent,
  CustomMessage,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWebsocketlUrl(websocketUrl));
    dispatch(setGraphqlUrl(graphqlUrl));
    if (defaultAgent !== undefined) dispatch(setAgent(defaultAgent));
    if (customStyling !== undefined) dispatch(setStyling(customStyling));
    if (userData !== undefined) dispatch(setUserData(userData));
  }, [
    websocketUrl,
    graphqlUrl,
    customStyling,
    userData,
    dispatch,
    defaultAgent,
  ]);
  const { isConversationWindowVisible, toggleWidget } = useConvoStack();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  useEffect(() => {
    if (isConversationWindowVisible) {
      setIsShowing(true);
      if (
        typeof document !== "undefined" &&
        typeof window !== "undefined" &&
        window.innerWidth < 640
      ) {
        document.body.style.overflow = "hidden";
      }
    } else {
      setTimeout(() => {
        setIsShowing(false);
        if (
          typeof document !== "undefined" &&
          typeof window !== "undefined" &&
          window.innerWidth < 640
        ) {
          document.body.style.overflow = "scroll";
        }
      }, 200);
    }
  }, [isConversationWindowVisible]);

  return (
    <CustomIconsContext.Provider value={icons}>
      <div className="z-50 convostack">
        {isShowing && (
          <div
            className={
              isConversationWindowVisible
                ? "animate-conversation-window-fade-enter"
                : "animate-conversation-window-fade-out"
            }
          >
            <ConversationWindow
              onClickClose={() => toggleWidget(!isConversationWindowVisible)}
              CustomMessage={CustomMessage}
            />
          </div>
        )}
        <div className="sm:hidden">
          {!isShowing && (
            <div
              className={
                isConversationWindowVisible
                  ? "animate-conversation-window-fade-out"
                  : ""
              }
            >
              <LaunchButton
                onClickClose={() => toggleWidget(!isConversationWindowVisible)}
                isConversationWindowVisible={isConversationWindowVisible}
              />
            </div>
          )}
        </div>
        <div className="max-sm:hidden">
          <LaunchButton
            onClickClose={() => toggleWidget(!isConversationWindowVisible)}
            isConversationWindowVisible={isConversationWindowVisible}
          />
        </div>
      </div>
    </CustomIconsContext.Provider>
  );
};

export default App;
