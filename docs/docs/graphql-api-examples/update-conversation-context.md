# Update Conversation Context

## Mutation:

```graphql
mutation updateConversationContext($context: JSON!) {
    updateConversationContext(conversationId: "5e602a16-fdb6-4ca8-b415-48ae16a599c4", context: $context) {
    id
  }
}

```

## Variables:

```json
{
  "context": {
    "your_custom_context_arg": "whatever you want"
  }
}
```

## Response:

```json
{
  "data": {
    "updateConversationContext": {
      "id": "5e602a16-fdb6-4ca8-b415-48ae16a599c4"
    }
  }
}
```