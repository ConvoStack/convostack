import { Provider } from "react-redux";
import App from "./App";
import store from "./redux";
import { CustomStyling, CustomIcons, UserData } from "./types/CustomStyling";

export interface ConvoStackWrapperProps {
  graphqlUrl: string;
  websocketUrl: string;
  userData?: UserData;
  customStyling?: CustomStyling;
  icons?: CustomIcons;
  children: React.ReactNode;
}

const ConvoStackWrapper: React.FC<ConvoStackWrapperProps> = ({
  graphqlUrl,
  websocketUrl,
  userData,
  customStyling,
  icons,
  children,
}) => {
  return (
    <Provider store={store}>
      <App
        graphqlUrl={graphqlUrl}
        websocketUrl={websocketUrl}
        userData={userData}
        customStyling={customStyling}
        icons={icons}
      />
      {children}
    </Provider>
  );
};

export default ConvoStackWrapper;
