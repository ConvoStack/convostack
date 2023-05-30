# Refresh Auth Token

```graphql
mutation RefreshAuth {
  refreshAuth(
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWE2MTJiNC0yYjFiLTQyZTYtYWUzZS00OTFlZDZkNTM0MzkiLCJlbWFpbCI6InN2YXJsYW1vdi54eXpAZ21haWwuY29tIiwia2luZCI6InJlZnJlc2giLCJpYXQiOjE2ODMzMzk5NDcsImV4cCI6MjI4ODEzOTk0N30.aNvEGBOwi1lLiyqWrkQf1MUR63mLBKxz1HKs1i4Vhks"
  ) {
    userId
    email
    name
    anonymous
    anonymousId
    externalId
    refreshToken {
      token
      expAt
    }
    accessToken {
      token
      expAt
    }
  }
}
```

```json
{
  "data": {
    "refreshAuth": {
      "userId": "eaa612b4-2b1b-42e6-ae3e-491ed6d53439",
      "email": "xx.xyz@gmail.com",
      "name": "x x",
      "anonymous": false,
      "anonymousId": null,
      "externalId": null,
      "refreshToken": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWE2MTJiNC0yYjFiLTQyZTYtYWUzZS00OTFlZDZkNTM0MzkiLCJlbWFpbCI6InN2YXJsYW1vdi54eXpAZ21haWwuY29tIiwia2luZCI6InJlZnJlc2giLCJpYXQiOjE2ODMzNDAwMDcsImV4cCI6MjI4ODE0MDAwN30._5CUiL7hLNPEnas9isZ5s-ZpMthZ6MLBSrP7rie1_Dc",
        "expAt": 1683944807
      },
      "accessToken": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlYWE2MTJiNC0yYjFiLTQyZTYtYWUzZS00OTFlZDZkNTM0MzkiLCJlbWFpbCI6InN2YXJsYW1vdi54eXpAZ21haWwuY29tIiwia2luZCI6ImFjY2VzcyIsImlhdCI6MTY4MzM0MDAwNywiZXhwIjoxNjg0MjQwMDA3fQ.qLSwyYvOdz0ERUeU1St6mxaiUymP-j8fWEKdhSpLPYk",
        "expAt": 1683340907
      }
    }
  }
}
```
