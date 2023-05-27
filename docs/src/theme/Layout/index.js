import React from 'react';
import Layout from '@theme-original/Layout';
import { ConvoStackWrapper } from 'convostack/frontend-react';

export default function LayoutWrapper(props) {
  return (
    <ConvoStackWrapper 
      graphqlUrl="https://playground.convostack.ai/graphql"
      websocketUrl="wss://playground.convostack.ai/graphql"
      defaultAgent={"langchain-pinecone-chat-qa"}
      customStyling={{
        headerText: "Hello, ConvoStack",
        headerTextColor: "text-white",
        iconsColor: "white",
      }}
    >
      <Layout {...props} />
    </ConvoStackWrapper>
  );
}
