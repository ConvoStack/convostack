import React from "react";
import { ConvoStackWrapper } from "convostack/frontend-react";

export default function ConvoStackDynamic({ children }: any) {
  return (
    <>
      <ConvoStackWrapper
        graphqlUrl="https://playground.convostack.ai/graphql"
        websocketUrl="wss://playground.convostack.ai/graphql"
      >
        {children}
      </ConvoStackWrapper>
    </>
  );
}
