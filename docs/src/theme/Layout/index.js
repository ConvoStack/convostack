import React from 'react';
import Layout from '@theme-original/Layout';
import Loadable from "@loadable/component"
import { ConvoStackWrapper } from 'convostack/frontend-react';

export default function LayoutWrapper(props) {
  // const ConvoStackDynamic = Loadable(() => import("../../ConvoStackDynamic"));
  return (
    <ConvoStackWrapper
      graphqlUrl="https://playground.convostack.ai/graphql"
      websocketUrl="wss://playground.convostack.ai/graphql"
    >
      <Layout {...props} />
    </ConvoStackWrapper>
  );
}
