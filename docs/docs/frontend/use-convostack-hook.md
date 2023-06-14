---
sidebar_position: 0.3
---

# useConvoStack() Hook

The `useConvoStack` hook provides access to state variables and functions that are shared among all ConvoStack frontend components. It utilizes Redux Toolkit for state management.

To utilize the hook in your application, simply import and call the hook within any child component of the `ConvoStackWrapper` component:

```typescript
import { useConvoStack } from "convostack/frontend-react";

...

const { toggleWidgetWindow, openConversation, graphqlUrl } = useConvoStack();
```

Although we give access to state variables, you will primarily be using the following functions to customize the behavior and interaction of ConvoStack frontend components:

## useConvoStack() Functions

### toggleWidgetWindow

```typescript
const toggleWidgetWindow = (arg: boolean): void
```

Description:

- The `toggleWidgetWindow` function is used to control the visibility of the widget.

Parameters:

- `arg: boolean`: When set to `true`, the widget will be toggled on and displayed. Conversely, when set to `false`, the widget will be toggled off and hidden.

Example Usage:

```typescript
// Toggles on the widget to display the chatbot window
toggleWidgetWindow(true);

// Toggles off the widget to hide the chatbot window
toggleWidgetWindow(false);
```

### openConversation

```typescript
const openConversation = async (
  conversationId: string | null,
  agent?: string | null,
  context?: { [embedId: string]: string } | null,
  embedId?: string
): Promise<string>
```

Description:

- The `openConversation` function is used to open a new or existing conversation for the widget or an `ConvoStackEmbed` component.

Parameters:

- `conversationId: string | null` - The ID of the conversation to be opened. Pass `null` to create a new conversation.
- `agent?: string | null` - The agent for the conversation. If `null` is provided, the `defaultAgent` prop value from `ConvoStackWidget` is used.
- `context?: { [embedId: string]: string } | null` - Additional context data for the conversation, provided as a JSON object.
- `embedId?: string`: The `embedId` of the `ConvoStackEmbed` component for which to open the conversation. If provided, it opens a conversation specific to that `ConvoStackEmbed` component. If not provided, it opens a conversation in the widget component.

Return Type:

- `Promise<string>`: A promise that resolves to a string representing the conversation ID of the opened conversation.

Example Usage:

```typescript
// Opening an existing conversation with a specific ID
openConversation("exampleId");

// Opening a new conversation with an agent named OpenAI and a specified context value
const conversationId = await openConversation(null, "OpenAI", {
  example: "context",
});

// Opening a new conversation for a specific ConvoStackEmbed component using an embedId
const conversationId = await openConversation(
  null,
  null,
  null,
  "ConvoStackEmbedKey"
);
```

### openConversationList

```typescript
const openConversationList = (embedId?: string): void
```

Description:

- The `openConversationList` function opens the conversation list of the widget or an `ConvoStackEmbed` component.

Parameters:

- `embedId?: string` - The `embedId` of the `ConvoStackEmbed` component for which to open the conversation list. If provided, it opens the conversation list of the `ConvoStackEmbed` component. If not provided, it opens the conversation list of the widget.

Example Usage:

```typescript
// Opening the conversation list of the chatbot widget
openConversationList();

// Opening the conversation list of an ConvoStackEmbed component with the embedId "exampleId"
openConversationList("exampleId");
```

### updateContext

```typescript
const updateContext = async (
  conversationId: string,
  context: { [key: string]: string }
): Promise<void>
```

Description:

- The `updateContext` function is used to update the context of a conversation specified by its conversation ID. It allows you to provide a new context as a JSON object and updates the context for the given conversation.

Parameters:

- `conversationId: string` - The ID of an existing conversation for which the context needs to be updated.
- `context: { [key: string]: string }` - The new context to be assigned to the conversation. It should be provided as a JSON object where the keys are strings.

Example Usage:

```typescript
// Updating the context of an existing conversation
const updatedContext = {
  key1: "value1",
  key2: "value2",
};

updateContext("conversation123", updatedContext);
```

### sendMessage

```typescript
sendMessage = async (
  message: string,
  conversationId: string | null,
  agent?: string,
  newContext?: {
    [key: string]: string;
  }
): void
```

Description:

- The `sendMessage` function is used to send messages without using the user input box of the widget or the `ConvoStackEmbed` component.

Parameters:

- `message: string` - The content of the message you want to send.
- `conversationId: string | null` - The ID of the conversation you want to send a message to. To create a new conversation, set this to `null`.
- `agent` - If null, it will use the agent that was set for the existing conversation.
- `newContext: { [key: string]: string }` - The context you want to pass in when sending a message.

### dropSubscription

```typescript
const dropSubscription = (embedId?: string): void
```

Description:

- The `dropSubscription` function is used to drop the WebSocket connection to the subscription of a specific `ConvoStackEmbed` component or the widget itself. This function is handled automatically by the component itself, so explicitly calling this function should be <u>limited or avoided</u> unless there is a specific need.

Parameters:

- `embedId?: string` - The `embedId` of the `ConvoStackEmbed` component for which to drop the WebSocket connection for. If not provided, it drops the WebSocket connection for the the widget.

## useConvoStack() State Variables

### context

```typescript
context: { [key: string]: string } | null
```

Description

- The `context` variable holds the most recent context value that was set in the Redux Toolkit store. It can be used to update the context of conversations. The context is represented as a JSON object where the keys are strings and the values are strings.

### data

```typescript
data: any;
```

Description

- The `data` variable stores the currently set conversation data for the widget. It represents the data associated with the current conversation being displayed.

### embedData

```typescript
embedData: { [embedId: string]: any }
```

Description

- The `embedData` variable stores the currently set conversation data for all the `ConvoStackEmbed` components. Each `ConvoStackEmbed` component is identified by a unique `embedId`, and the conversation data associated with each `ConvoStackEmbed` component is stored in the `embedData` object.

### isWidgetWindowVisible

```typescript
isWidgetWindowVisible: boolean;
```

Description

- The `isWidgetWindowVisible` variable indicates whether the widget window is currently visible or not. If the value is `true`, it means the widget window is showing. If the value is `false`, it means the widget window is not visible.

### isConversationListVisible

```typescript
isConversationListVisible: boolean;
```

- The `isConversationListVisible` variable indicates whether the conversation list window is currently visible or not. If the value is `true`, it means the conversation list window is showing. If the value is `false`, it means the conversation list window is not visible.

### isEmbedConversationListVisible

```typescript
isEmbedConversationListVisible: { [embedId: string]: boolean }
```

Description:

- The `isEmbedConversationListVisible` variable indicates whether the conversation list window is currently visible for each `ConvoStackEmbed` component, identified by its `embedId`. If the value for a specific `embedId` is `true`, it means the conversation list window is showing for that specific `ConvoStackEmbed` component. If the value is `false`, it means the conversation list window is not visible for that `ConvoStackEmbed` component.

### activeConversationId

```typescript
activeConversationId: string | null;
```

Description:

- The `activeConversationId` variable stores the ID of the currently selected conversation in the widget. If no conversation is currently selected, the value will be `null`.

### embedActiveConversationId

```typescript
embedActiveConversationId: { [embedId: string]: string | null }
```

Description:

- The `embedActiveConversationId` variable stores the IDs of the currently selected conversations for each `ConvoStackEmbed` component. Each `ConvoStackEmbed` component is identified by its `embedId` and the corresponding conversation ID stored in the object. If a conversation is not currently selected for a specific embed component, the value for that `embedId` will be `null`.
