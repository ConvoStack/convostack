# Get Conversations

```graphql
query GetConversations {
    getConversations {
        id
        title
        agent {
            key
            avatarUrl
            displayName
        }
        lastMessage {
            id
            content
            userId
        }
    }
}
```

```json
{
  "data": {
    "getConversations": [
      {
        "id": "5e602a16-fdb6-4ca8-b415-48ae16a599c4",
        "title": "Echo Agent",
        "agent": {
          "key": "default",
          "avatarUrl": null,
          "displayName": "Echo Agent"
        },
        "lastMessage": {
          "id": "80b645c4-ce6b-4f95-ba8c-5eaf3129cc9e",
          "content": "Test msg",
          "userId": null
        }
      }
    ]
  }
}
```