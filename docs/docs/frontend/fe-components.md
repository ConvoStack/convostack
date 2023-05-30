---
sidebar_position: 0.2
---

# React Components

All ConvoStack components are originally styled in TailwindCSS and exported, so they don't interfere with the styling of your own website. This allows seamless integration with existing components on your site. There are three React components that make up our component library:

## ConvoStackWrapper

The `ConvoStackWrapper` component serves as the entry point for integrating our chatbot widget into your site. It also provides a shared context for all `ConvoStackEmbed` components you choose to add within your application.

To add the chatbot widget, you need to include the `ConvoStackWrapper` component at the root of your application's component tree:

### Props

`ConvoStackWrapper` component currently has the following props:

```typescript
export interface ConvoStackWrapperProps {
  graphqlUrl: string;
  websocketUrl: string;
  userData?: UserData;
  customStyling?: CustomStyling;
  icons?: CustomIcons;
  defaultAgent?: string | null;
  disableWidget?: boolean;
  children: React.ReactNode;
  CustomMessage?: React.ComponentType<MessageProps>;
}
```

`graphqlUrl: string`

- Allows our ConvoStack components to make API calls to our backend. This prop specifies the URL endpoint for GraphQL API requests.

`websocketUrl: string`

- Enables a WebSocket connection for streaming and sending messages to AI agents. This prop specifies the URL endpoint for the WebSocket connection.

`userData?: UserData`

- Store a user's conversation history by passing in a userData object. The userData object is of type `UserData`.

`customStyling?: CustomStyling`

- Apply custom styling to the widget component by passing in a `customStyling` object. The `customStyling` object is of type `CustomStyling`.

  ```typescript
  export type CustomStyling = {
    headerColor?: string;
    headerText?: string;
    headerTextColor?: string;
    widgetLaunchButtonColor?: string;
    widgetLocation?: "right" | "left";
    widgetWindowHeightOffset?: string;
    widgetWindowWidth?: string;
    iconsColor?: string;
  };
  ```

  - For properties `headerColor`, `headerTextColor`, `widgetLaunchButtonColor`, and `iconsColor`, pass in an accepted CSS `color` value.
  - For properties `widgetWindowWidth` and `widgetWindowHeightOffset`, pass in an accepted CSS `height` and `width` value.

`icons?: CustomIcons`

- Pass in your own custom SVG React components for specific icons used in the widget. The `icons` object is of type `CustomIcons`

`defaultAgent?: string | null`

- This prop specifies the default agent to be used for new conversations for the widget. By default, it's `null`.

`disableWidget?: boolean`

- Setting this prop to true will remove the chatbot widget if you prefer to only use the `ConvoStackEmbed` component.

`children?: React.ReactNode`

- The `children` prop represents the content or components that the `ConvoStackWrapper` surrounds. It should typically include your entire application, allowing you to access and utilize the `useConvoStack` hook functions anywhere within your application.

`CustomMessage?: React.ComponentType<MessageProps>`

- The `CustomMessage` prop allows you to use a custom message component in place of the default `Message` bubble for displaying sent and received messages. The custom component should accept `MessageProps` as its props.

### Example Usage

```tsx
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

## ConvoStackEmbed

The `ConvoStackEmbed` component allows you to easily embed chat functionality into your website. It can be added multiple times throughout your application as a child of the `ConvoStackWrapper` component. By doing so, all instances of the `ConvoStackEmbed` component will share the same GraphQL and WebSocket URLs, ensuring synchronized data across all components.

### Props

`ConvoStackEmbed` has the following props:

```typescript
export interface ConvoStackEmbedProps {
  embedId: string;
  defaultAgent?: string | null;
  customStyling?: CustomEmbedStyling;
  CustomMessage?: React.ComponentType<MessageProps>;
}
```

`embedId: string`

- `ConvoStackEmbed` requires a unique ID to identify and manage its local state before storing it in the backend. This prop is crucial when you have multiple instances of the ConvoStackEmbed component within your application.
- To prevent interference between multiple ConvoStackEmbed components, make sure to assign a **different id value** to each instance.

`defaultAgent: string | null`

- This prop specifies the default agent to be used for new conversations when using the `ConvoStackEmbed` component that has `embedId`. By default, it's `null` or uses the `defaultAgent` value set in the `ConvoStackWrapper` component.

`customStyling?: CustomEmbedStyling`

- Apply custom styling to the widget component by passing in a `customStyling` object. The `customStyling` object is of type `CustomEmbedStyling`.

  ```typescript
  export type CustomEmbedStyling = {
    headerColor?: string;
    headerText?: string;
    headerTextColor?: string;
    embedWidth?: string;
    embedHeight?: string;
    iconsColor?: string;
  };
  ```

  - For properties `headerColor`, `headerTextColor`, and `iconsColor`, pass in an accepted CSS `color` value.
  - For properties `embedWidth` and `embedHeight`, pass in an accepted CSS `height` and `width` value.

`CustomMessage?: React.ComponentType<MessageProps>`

- The `CustomMessage` prop allows you to use a custom message component in place of the default `Message` bubble for displaying sent and received messages. The custom component should accept `MessageProps` as its props.

### Example Usage

```tsx
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConvoStackWrapper
      graphqlUrl={"https://example.com/graphql"}
      websocketUrl={"wss://example.com/graphql"}
    >
      <ConvoStackEmbed embedId={"id_1"} />
      <ConvoStackEmbed embedId={"id_2"} />
      <App />
    </ConvoStackWrapper>
  </>
);
```

## Message

By default, the `ConvoStackWrapper` component utilizes the built-in `Message` component to display all sent and received messages in the chat interface. However, if you prefer to use your own custom message component, the `ConvoStackWrapper` and `ConvoStackEmbed` components provide the `CustomMessage` prop to accommodate your customization needs.

To use the `CustomMessage` prop, you can provide a custom component that you have created that incorporates the `Message` component according to your own requirements.

### Props

The `Message` component currently has the following props:

```typescript
export interface MessageProps {
  width: null | string;
  message: { text: string; author: string };
  className?: string;
}
```

`width: null | string`

- Specifies the width of each message bubble component.

`message: { text: string; author: string }`

- An object that represents the content and author of the message to be displayed in the message bubble.

`className?: string`

- Allows you to apply additional custom CSS classes or Tailwind CSS classes to the message bubble component
