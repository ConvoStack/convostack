import React from 'react';
import Layout from '@theme-original/Layout';
import { ConvoStackWrapper } from 'convostack/frontend-react';

export default function LayoutWrapper(props) {
  return (
    <ConvoStackWrapper
      graphqlUrl="https://playground.convostack.ai/graphql"
      websocketUrl="wss://playground.convostack.ai/graphql"
    >
      <Layout {...props} />
    </ConvoStackWrapper>
  );
}
