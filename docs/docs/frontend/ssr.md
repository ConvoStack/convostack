---
sidebar_position: 0.4
---

# Importing ConvoStack in SSR Applications

Because ConvoStack relies on the client-side for certain behavior such as styling, importing ConvoStack components in your server-side rendered application must be done dynamically on the client-side. **Not doing so can lead to errors during build time such as `document is not defined` or `window is not defined`.**

More information on the difference between server-side and client-side rendering can be found [here](https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution-9).

Below, we provide instructions on how to correctly import ConvoStack in popular SSR web frameworks:

## [NextJS Application](https://nextjs.org/)

Below is an example of importing ConvoStack using NextJS's `next/dynamic` import:

```typescript
export default function ConvoStackDynamic({ children }) {
  const ConvoStackWrapper = dynamic(
    () =>
      import("convostack/frontend-react").then(
        (module) => module.ConvoStackWrapper
      ),
    {
      ssr: false,
    }
  );
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
```

The newly created `ConvoStackDynamic` component can then be imported and used at the root of your NextJS application:

```typescript
import ConvoStackDynamic from "./components/ConvoStackDynamic";
import App from "./App";

export default function Home() {
  return (
    <>
      <ConvoStackDynamic>
        <App />
      </ConvoStackDynamic>
    </>
  );
}
```

For further information, refer to NextJS's [documentation](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr) on importing client-side only packages.

## [Gatbsy Application](https://www.gatsbyjs.com/)

Below is an example of importing ConvoStack using React.lazy and Suspense on the client side only:

For further information, refer to Gatsby's [documentation](https://www.gatsbyjs.com/docs/using-client-side-only-packages/#workaround-3-use-reactlazy-and-suspense-on-client-side-only).

## [Docusaurus Application](https://docusaurus.io/)

Below is an example of properly importing:

```typescript
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
```

The newly created `ConvoStackDynamic` component can then be imported and used at the root of your Docusaurus application using [swizzle](https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root) and `@loadable/component`:

```typescript
import React from "react";
import Layout from "@theme-original/Layout";
import Loadable from "@loadable/component";

export default function LayoutWrapper(props) {
  const ConvoStackDynamic = Loadable(() => import("../../ConvoStackDynamic"));
  return (
    <ConvoStackDynamic>
      <Layout {...props} />
    </ConvoStackDynamic>
  );
}
```

## Other SSR Frameworks

For importing ConvoStack components in other types of SSR applications, the framework you are using should provide documentation regarding dynamic imports and/or lazy loading to defer the loading of client components or dissable SSR for ConvoStack components.
