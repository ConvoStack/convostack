---
sidebar_position: 0.2
---

# React Components

All ConvoStack components are originally styled in TailwindCSS and exported, so they don't interfere with the styling of your own website. This allows seamless integration with existing components on your site. There are three React components that make up our component library:

## ConvoStackWrapper

The `ConvoStackWrapper` component serves as the entry point for integrating our chatbot widget into your site. It also provides a shared context for all `ConvoStackEmbed` components you choose to add within your application.

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

- Allows our ConvoStack components to make API calls to our backend.

`websocketUrl: string`

- Enables a WebSocket connection for streaming and sending messages to AI agents.

`userData?: UserData`

- Stuff

`customStyling?: CustomStyling`

- Stuff

`icons?: CustomIcons`

- Stuff

`defaultAgent?: string | null`

- Stuff

`disableWidget?: boolean`

- Setting this prop to true will remove the chatbot widget if you prefer to only use the `ConvoStackEmbed` component.

`children?: React.ReactNode`

- Stuff

`CustomMessage?: React.ComponentType<MessageProps>`

- Stuff

## ConvoStackEmbed

The `ConvoStackEmbed` component allows you to easily embed chat functionality into your website. It can be added multiple times throughout your application as a child of the `ConvoStackWrapper` component. By doing so, all instances of the `ConvoStackEmbed` component will share the same GraphQL and WebSocket URLs, ensuring synchronized data across all components.

Below is an example use case of the `ConvoStackEmbed` component:

```typescript
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConvoStackWrapper
      graphqlUrl={"https://example.com/graphql"}
      websocketUrl={"wss://example.com/graphql"}
    >
      <ConvoStackEmbed embedId={"use case 1"} />
      <ConvoStackEmbed embedId={"use case 2"} />
      <App />
    </ConvoStackWrapper>
  </>
);
```

`ConvoStackEmbed` has the following props:

```typescript
export interface ConvoStackEmbedProps {
  embedId: string;
  customStyling?: CustomEmbedStyling;
  CustomMessage?: React.ComponentType<MessageProps>;
}
```

`embedId: string`

- `ConvoStackEmbed` requires a unique ID to identify and manage its local state before storing it in the backend. This prop is crucial when you have multiple instances of the ConvoStackEmbed component within your application.
- To prevent interference between multiple ConvoStackEmbed components, make sure to assign a **different id value** to each instance.

`customStyling?: CustomEmbedStyling`

- stuff

`CustomMessage?: React.ComponentType<MessageProps>`

- stuff

## Message

By default, the `ConvoStackWrapper` component utilizes the built-in `Message` component to display all sent and received messages in the chat interface. However, if you prefer to use your own custom message component, the `ConvoStackWrapper` and `ConvoStackEmbed` components provide the `CustomMessage` prop to accommodate your customization needs.

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

- stuff

`message: { text: string; author: string }`

- stuff

`className?: string`

- stuff
