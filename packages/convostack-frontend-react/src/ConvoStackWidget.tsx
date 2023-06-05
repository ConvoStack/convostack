import { useEffect, useState } from "react";
import { fetchTokens } from "./api/apiClient";
import App from "./App";
import { MessageProps } from "./components/Message";
import { CustomIcons, CustomStyling, UserData } from "./types";

export interface ConvoStackWidgetProps {
  graphqlUrl: string;
  websocketUrl: string;
  workspaceId?: string;
  userData?: UserData;
  customStyling?: CustomStyling;
  icons?: CustomIcons;
  defaultAgent?: string | null;
  disableWidget?: boolean;
  CustomMessage?: React.ComponentType<MessageProps>;
}

const ConvoStackWidget: React.FC<ConvoStackWidgetProps> = ({
  graphqlUrl,
  websocketUrl,
  workspaceId,
  userData,
  customStyling,
  icons,
  defaultAgent,
  disableWidget = false,
  CustomMessage,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await fetchTokens(graphqlUrl, workspaceId, userData);
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
  return !isLoading ? (
    <App
      graphqlUrl={graphqlUrl}
      websocketUrl={websocketUrl}
      workspaceId={workspaceId}
      userData={userData}
      customStyling={customStyling}
      icons={icons}
      defaultAgent={defaultAgent}
      disableWidget={disableWidget}
      CustomMessage={CustomMessage}
    />
  ) : (
    <></>
  );
};

export default ConvoStackWidget;
