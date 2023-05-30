# Login

```graphql
mutation login {
  login(
    email: "xx.xyz@gmail.com"
    name: "xxx"
    externalId: "xyzextid"
    hash: "420"
  ) {
    userId
    email
    name
    anonymous
    anonymousId
    externalId
    accessToken {
      token
      expAt
    }
    refreshToken {
      token
      expAt
    }
  }
}
```

```json
{
  "data": {
    "login": {
      "userId": "eaa612b4-2b1b-42e6-ae3e-491ed6d53439",
      "email": "xx.xyz@gmail.com",
      "name": "xxx",
      "anonymous": false,
      "anonymousId": null,
      "externalId": null,
      "accessToken": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWE2MTJiNC0yYjFiLTQyZTYtYWUzZS00OTFlZDZkNTM0MzkiLCJlbWFpbCI6InN2YXJsYW1vdi54eXpAZ21haWwuY29tIiwia2luZCI6ImFjY2VzcyIsImlhdCI6MTY4MzMzOTgwOSwiZXhwIjoxNjg0MjM5ODA5fQ.LMbbz82isUYQe3EvU6wR292yLoHcGZT-9V8CX1MIYk4",
        "expAt": 1683340709
      },
      "refreshToken": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWE2MTJiNC0yYjFiLTQyZTYtYWUzZS00OTFlZDZkNTM0MzkiLCJlbWFpbCI6InN2YXJsYW1vdi54eXpAZ21haWwuY29tIiwia2luZCI6InJlZnJlc2giLCJpYXQiOjE2ODMzMzk4MDksImV4cCI6MjI4ODEzOTgwOX0.L2S5HGCQdRkaSHxjkku2Dh3zqRAiN7Ue0RW_ExS_vuw",
        "expAt": 1683944609
      }
    }
  }
}
```
