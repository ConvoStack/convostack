import { Provider } from "react-redux";
import App from "./App";
import store from "./redux";
import { CustomStyling, CustomIcons, UserData } from "./types";
import "../src/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchTokens } from "./api/apiClient";
import { useEffect, useState } from "react";
import { MessageProps } from "./components/Message";

export interface ConvoStackWrapperProps {
  graphqlUrl: string;
  websocketUrl: string;
  userData?: UserData;
  customStyling?: CustomStyling;
  icons?: CustomIcons;
  defaultAgent?: string | null;
  children: React.ReactNode;
  CustomMessage?: React.ComponentType<MessageProps>;
}

const ConvoStackWrapper: React.FC<ConvoStackWrapperProps> = ({
  graphqlUrl,
  websocketUrl,
  userData,
  customStyling,
  icons,
  defaultAgent,
  children,
  CustomMessage,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await fetchTokens(graphqlUrl, userData);
    };

    fetchData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {!isLoading && (
          <App
            graphqlUrl={graphqlUrl}
            websocketUrl={websocketUrl}
            userData={userData}
            customStyling={customStyling}
            icons={icons}
            defaultAgent={defaultAgent}
            CustomMessage={CustomMessage}
          />
        )}
        {children}
      </Provider>
    </QueryClientProvider>
  );
};

export default ConvoStackWrapper;
