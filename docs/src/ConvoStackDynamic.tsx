import BrowserOnly from "@docusaurus/BrowserOnly";
import React from "react";

const ConvoStackDynamic = ({ children }) => {
  return (
    <BrowserOnly fallback={<></>}>
      {() => {
        const ConvoStackWrapper =
          require("convostack/frontend-react").ConvoStackWrapper;
        return (
          <ConvoStackWrapper
            graphqlUrl="https://playground.convostack.ai/graphql"
            websocketUrl="wss://playground.convostack.ai/graphql"
            defaultAgent={"langchain-pinecone-chat-qa"}
            customStyling={{
              headerText: "Hello, ConvoStack",
              headerTextColor: "white",
              iconsColor: "white",
            }}
          >
            {children}
          </ConvoStackWrapper>
        );
      }}
    </BrowserOnly>
  );
};

export default ConvoStackDynamic;
