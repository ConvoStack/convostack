import { ConvoStackWrapper } from "convostack/frontend-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import React from "react";

export default function ConovStackDynamic({ children }) {
  return (
    <BrowserOnly>
      {() => (
        <ConvoStackWrapper
          graphqlUrl="https://playground.convostack.ai/graphql"
          websocketUrl="wss://playground.convostack.ai/graphql"
        >
          {children}
        </ConvoStackWrapper>
      )}
    </BrowserOnly>
  );
}
