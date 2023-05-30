# Send Message

* `conversationId` should only be set when sending to an existing conversation (e.g., already subscribed or replying to a previous conversation), otherwise null/unset
* `agent` is optional (for multi-model)
* `context` is optional (for setting conversation context)

```graphql
mutation sendMessage {
    sendMessage(message: {content: "Test msg"}, conversationId: "df42e373-d4bc-4705-8053-3537455af554", agent: null) {
        conversationId
    }
}
```

Returns the conversation ID so that client has a handle to follow when subscribing (if not yet subscribed)
```json
{
  "data": {
    "sendMessage": {
      "conversationId": "df42e373-d4bc-4705-8053-3537455af554"
    }
  }
}
```