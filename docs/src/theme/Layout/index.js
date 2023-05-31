import React from 'react';
import Layout from '@theme-original/Layout';
import ConvoStackDynamic from '../../ConvoStackDynamic';
import "./style.css"

export default function LayoutWrapper(props) {
  return (
    <ConvoStackDynamic 
      graphqlUrl="https://playground.convostack.ai/graphql"
      websocketUrl="wss://playground.convostack.ai/graphql"
      defaultAgent={"langchain-pinecone-chat-qa"}
      customStyling={{
        headerText: "Hello, ConvoStack",
        headerTextColor: "white",
        iconsColor: "white",
      }}
    >
      <Layout {...props} />
    </ConvoStackDynamic>
  );
}
