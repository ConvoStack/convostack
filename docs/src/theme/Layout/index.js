import React from 'react';
import Layout from '@theme-original/Layout';
// import ConovStackDynamic from '../../ConvoStackDynamic';
import { ConvoStackWrapper, ConvoStackWidget } from 'convostack/frontend-react';

export default function LayoutWrapper(props) {
  return (
    <>
      <ConvoStackWrapper>
        <ConvoStackWidget 
          graphqlUrl='https://playground.convostack.ai/graphql'
          websocketUrl='wss://playground.convostack.ai/graphql'
          defaultAgent={"langchain-pinecone-chat-qa"}
        />
        <Layout {...props} />
      </ConvoStackWrapper>
    </>
  );
}
