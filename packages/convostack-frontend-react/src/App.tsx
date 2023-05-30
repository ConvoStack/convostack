import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import WidgetWindow from "./components/WidgetWindow";
import LaunchButton from "./components/LaunchButton";
import { ConvoStackWrapperProps } from "./ConvoStackWrapper";
import useConvoStack from "./hooks/useConvoStack";
import {
  setDefaultAgent,
  setGraphqlUrl,
  setStyling,
  setUserData,
  setWebsocketlUrl,
} from "./redux/slice";
import { CustomIcons } from "./types";

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
  disableWidget = false,
  CustomMessage,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWebsocketlUrl(websocketUrl));
    dispatch(setGraphqlUrl(graphqlUrl));
    if (defaultAgent !== undefined) dispatch(setDefaultAgent(defaultAgent));
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
  const { isWidgetWindowVisible, toggleWidgetWindow } = useConvoStack();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  useEffect(() => {
    if (isWidgetWindowVisible) {
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
  }, [isWidgetWindowVisible]);

  return (
    <CustomIconsContext.Provider value={icons}>
      {!disableWidget && (
        <div className="z-50 convostack">
          {isShowing && (
            <div
              className={
                isWidgetWindowVisible
                  ? "animate-conversation-window-fade-enter"
                  : "animate-conversation-window-fade-out"
              }
            >
              <WidgetWindow
                onClickClose={() => toggleWidgetWindow(!isWidgetWindowVisible)}
                CustomMessage={CustomMessage}
              />
            </div>
          )}
          <div className="sm:hidden">
            {!isShowing && (
              <div
                className={
                  isWidgetWindowVisible
                    ? "animate-conversation-window-fade-out"
                    : ""
                }
              >
                <LaunchButton
                  onClickClose={() =>
                    toggleWidgetWindow(!isWidgetWindowVisible)
                  }
                  isWidgetWindowVisible={isWidgetWindowVisible}
                />
              </div>
            )}
          </div>
          <div className="max-sm:hidden">
            <LaunchButton
              onClickClose={() => toggleWidgetWindow(!isWidgetWindowVisible)}
              isWidgetWindowVisible={isWidgetWindowVisible}
            />
          </div>
        </div>
      )}
    </CustomIconsContext.Provider>
  );
};

export default App;
