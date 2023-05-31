import React from 'react';
import Layout from '@theme-original/Layout';
import Loadable from "@loadable/component"

export default function LayoutWrapper(props) {
  const ConvoStackDynamic = Loadable(() => import("../../ConvoStackDynamic"));
  return (
    <ConvoStackDynamic>
      <Layout {...props} />
    </ConvoStackDynamic>
  );
}
