# Subscribe to Conversation Events

Use this subscription to receive conversation message, response token streams, and initially load message history too.

```graphql
subscription subscribeConversationEvents {
    event: subscribeConversationEvents(conversationId: "df42e373-d4bc-4705-8053-3537455af554", agent: null) {
        kind
        payload
    }
}
```

* The first event over the subscription will _always_ be the `conversation_metadata` event.
* This message also contains the "primer" message for the conversation (from the AI).
* The `conversation_metadata` event also provides the `conversation.id` in case the
  original `subscribeConversationEvents` subscription
  was called without a `conversationId` (the newly-created conversation).

```json
{
  "data": {
    "event": {
      "kind": "conversation_metadata",
      "payload": {
        "id": "df42e373-d4bc-4705-8053-3537455af554",
        "title": "New Conversation Fri May 05 2023 17:32:44 GMT-0400 (Eastern Daylight Time)",
        "agent": "default",
        "primer": "This is demo echo agent. Write me a message, and I will send it back to you!",
        "userId": "eaa612b4-2b1b-42e6-ae3e-491ed6d53439",
        "createdAt": "2023-05-05T21:32:44.694Z",
        "updatedAt": "2023-05-05T21:32:44.694Z"
      }
    }
  }
}
```

Example with primer and messages:

```json
{
  "data": {
    "event": {
      "kind": "message",
      "payload": {
        "id": "1a858c8b-d6d3-481d-80c6-724445465bee",
        "content": "Test msg",
        "turn": 2,
        "role": "AI",
        "pending": false,
        "conversationId": "df42e373-d4bc-4705-8053-3537455af554",
        "userId": null,
        "createdAt": "2023-05-06T02:28:08.255Z",
        "updatedAt": "2023-05-06T02:28:08.255Z"
      }
    }
  }
}

// Response received at 22:28:50
{
  "data": {
    "event": {
      "kind": "message",
      "payload": {
        "id": "5058c622-20ac-4ec3-8e1b-04b00c10caa7",
        "content": "Test msg",
        "turn": 1,
        "role": "Human",
        "pending": false,
        "conversationId": "df42e373-d4bc-4705-8053-3537455af554",
        "userId": "eaa612b4-2b1b-42e6-ae3e-491ed6d53439",
        "createdAt": "2023-05-06T02:28:08.040Z",
        "updatedAt": "2023-05-06T02:28:08.040Z"
      }
    }
  }
}
```