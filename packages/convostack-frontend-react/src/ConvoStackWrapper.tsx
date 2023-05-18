import { Provider } from "react-redux";
import App from "./App";
import store from "./redux";
import { CustomStyling, CustomIcons, UserData } from "./types/CustomStyling";
import "../src/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createApiClient, fetchTokens } from "./api/apiClient";
import { useEffect } from "react";

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
  useEffect(() => {
    const fetchData = async () => {
      await fetchTokens(graphqlUrl, userData);
    };

    fetchData();
  }, []);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default ConvoStackWrapper;
