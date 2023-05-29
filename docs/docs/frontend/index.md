---
id: "index"
title: "Overview"
sidebar_label: "Overview"
sidebar_position: 0.1
---

# ConvoStack Frontend

This documentation provides information about everything frontend-related for ConvoStack.

The ConvoStack frontend code can be found in the `convostack/frontend-react` package that comes when you `npm install convostack`. In the package, you will find exported React components, types, and a hook to easily make API calls and handle state management.

## ConvoStack React Components

All ConvoStack components are originally styled in TailwindCSS and exported, so they don't interfere with the styling of your own website. This allows seamless integration with existing components on your site. There are three React components that make up our component library:

### ConvoStackWrapper

The `ConvoStackWrapper` component serves as the entry point for integrating our chatbot widget into your site. It also provides a shared context for all `EmbedChat` components you choose to add within your application.

To add the chatbot widget, you need to include the `ConvoStackWrapper` component at the root of your application's component tree:

```typescript
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConvoStackWrapper
      graphqlUrl={"https://example.com/graphql"}
      websocketUrl={"wss://example.com/graphql"}
    >
      <App />
    </ConvoStackWrapper>
  </>
);
```

The `ConvoStackWrapper` component currently has the following props:

```typescript
export interface ConvoStackWrapperProps {
  graphqlUrl: string;
  websocketUrl: string;
  userData?: UserData;
  customStyling?: CustomStyling;
  icons?: CustomIcons;
  defaultAgent?: string | null;
  children: React.ReactNode;
  CustomMessage?: React.ComponentType<MessageProps>;
}
```

`graphqlUrl: string`

Allows our ConvoStack components to make API calls to our backend.

`websocketUrl: string`

Enables a WebSocket connection for streaming and sending messages to AI agents.

`userData?: UserData`

Stuff

`customStyling?: CustomStyling`

Stuff

`icons?: CustomIcons`

Stuff

`defaultAgent?: string | null`

Stuff

`disableWidget?: boolean`

Setting this prop to true will remove the chatbot widget if you prefer to only use the `EmbedChat` component.

`children?: React.ReactNode`

Stuff

`CustomMessage?: React.ComponentType<MessageProps>`

Stuff

### EmbedChat

The `EmbedChat` component allows you to easily embed chat functionality into your website. It can be added multiple times throughout your application as a child of the `ConvoStackWrapper` component. By doing so, all instances of the `EmbedChat` component will share the same GraphQL and WebSocket URLs, ensuring synchronized data across all components.

Below is an example use case of the `EmbedChat` component:

```typescript
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConvoStackWrapper
      graphqlUrl={"https://example.com/graphql"}
      websocketUrl={"wss://example.com/graphql"}
    >
      <EmbedChat id={"use case 1"} />
      <EmbedChat id={"use case 2"} />
      <App />
    </ConvoStackWrapper>
  </>
);
```

`EmbedChat` has the following props:

```typescript
export interface EmbedChatProps {
  id: string;
  customStyling?: CustomEmbedStyling;
  CustomMessage?: React.ComponentType<MessageProps>;
}
```

`id: string`

`EmbedChat` requires a unique ID to identify and manage its local state before storing it in the backend. This prop is crucial when you have multiple instances of the EmbedChat component within your application.

To prevent interference between multiple EmbedChat components, make sure to assign a **different id value** to each instance.

`customStyling?: CustomEmbedStyling`

`CustomMessage?: React.ComponentType<MessageProps>`

### Message

By default, the `ConvoStackWrapper` component utilizes the built-in `Message` component to display all sent and received messages in the chat interface. However, if you prefer to use your own custom message component, the `ConvoStackWrapper` and `EmbedChat` components provide the `CustomMessage` prop to accommodate your customization needs.

To use the `CustomMessage` prop, you can provide a custom component that you have created that incorporates the `Message` component according to your own requirements.

Here's an example of how to use the `CustomMessage` prop with `Message`:

The `Message` component currently has the following props:

```typescript
export interface MessageProps {
  width: null | string;
  message: { text: string; author: string };
  className?: string;
}
```

`width: null | string`

stuff

`message: { text: string; author: string }`

stuff

`className?: string`

stuff

## useConvoStack() Hook

The `useConvoStack` hook provides access to state variables and functions that are shared among all ConvoStack frontend components. It utilizes Redux Toolkit for state management.

To utilize the hook in your application, simply import and call the hook within any component which is a child of the `ConvoStackWrapper` component:

```typescript
import { useConvoStack } from "convostack/frontend-react";

...

const { toggleWidget, openConversation, graphqlUrl } = useConvoStack();
```

Although we give access to state variables, you will primarily be using the following functions to customize the behavior and interaction of ConvoStack frontend components:

### useConvoStack() Functions

```typescript
const toggleWidget = (arg: boolean): void
```

Toggles opening and closing the widget.

```typescript
const openConversation = async (
  conversationId: string | null,
  agent?: string | null,
  context?: { [key: string]: string } | null,
  key?: string
): Promise<string>
```

Opens a new conversation in the widget or an `EmbedChat` component.

```typescript
const openConversationList = (key?: string): void
```

Opens the conversation list of the widget or an `EmbedChat` component.

```typescript
const setActiveConversationId = (
  conversationId: string | null,
  context?: { [key: string]: string },
  key?: string
): void
```

Sets the active chat conversation ID.

```typescript
const updateContext = async (
  conversationId: string,
  context: { [key: string]: string }
): Promise<void>
```

Updates the context of a specific conversation using the conversation ID prop. Context must be a JSON object.
