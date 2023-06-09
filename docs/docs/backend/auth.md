---
sidebar_position: 0.4
---

# Authentication

ConvoStack auth is extremely flexible. Without writing any custom code, you can:

* Allow access to anonymous users (no need to send any identifiable user data)
* Send unverified user data through the frontend (e.g., set a name without building any backend verification logic)
* Enforce user data verification with a 'user data verification hash' which is a common and easy-to-implement strategy
  for validating user information for in-app widgets. For example, this is how [Intercom](https://intercom.com/) manages
  user [verification](https://developers.intercom.com/installing-intercom/docs/enable-identity-verification-on-your-web-product).

## ConvoStack built-in `AuthJWT` authentication strategy

For most use cases, we recommend using the default `AuthJWT` strategy as it works out of the box with the ConvoStack
frontend library (embed, widget, etc.).

### Usage

```typescript
// Import the default AuthJWT strategy from convostack
import {AuthJWT} from "convostack/auth-jwt";

// Setup the ConvoStack backend
const backend = new ConvoStackBackendExpress({
    auth: new AuthJWT(storage, {
        // The JWT secret is used to hash and verify the JWTs used by the auth strategy (HS256 algorithm)
        // You will need to randomly generate a random secret string that is at least 32-characters long for your jwtSecret 
        jwtSecret: process.env.JWT_SECRET,
        // Choose whether to allow access to 'anonymous' users who don't have any user data
        allowAnonUsers: process.env.ALLOW_ANONYMOUS_USERS == "true",
        // (Optional) This secret is used to verify the user data hash
        // You will need to randomly generate a random secret string that is at least 32-characters long for your userDataVerificationSecret
        userDataVerificationSecret: process.env.USER_VERIFICATION_HASH_SECRET,
        // (Optional, default false) When true, require the user data verification hash
        requireUserVerificationHash: !(process.env.REQUIRE_USER_VERIFICATION_HASH == "false")
    }),
    ...
});
```

### User data

The ConvoStack backend accepts the following user data fields by default:

* `email: string` (Optional): Email address of the user in your system
* `name: string` (Optional): The name field for the user in your system
* `userId: string` (Optional): User ID of the user in your system
    * NOTE: Within ConvoStack, your system's user ID is called the `externalId` since it is external to ConvoStack.
      Internally, ConvoStack will generate another user ID for storage that is a UUID. You shouldn't need to ever know
      or be concerned with the user's ConvoStack ID

We strongly recommend using the 'verification' hash option whenever you are using user data in production to ensure that
users are really who they say they are. If the verification hashes are not enforced, then it would be trivial for an
attacker to impersonate users of your platform on the ConvoStack chat and even see the impersonated user's
conversations.

### Verification hashes

To make sure that your ConvoStack users are who they say they are, we strongly recommend spending a bit of time to
generate a user verification hash on your application's backend that your client will pass to the ConvoStack frontend's
`UserData.hash` field. You will also need to update your ConvoStack backend configuration as documented above to ensure
that user verification hashes are enforced for all of your users.

**⚠️ DO NOT expose the secret user verification hash publicly.** For example, do not generate the hash client-side as this
would completely nullify the security benefits of this strategy. It must be generated by a backend service that can
ensure that it's sending the hash to an authenticated-by-your-system user and can store the secret in a way that it will
not be exposed to the public.

#### TypeScript (Node)

```typescript
// Import the built-in node Crypto library
import * as crypto from "crypto";

/***
 * Returns a string hash of the user data for verifying ConvoStack users. Ensure that you trim all of the strings that you send as leading/trailing spaces will cause issues with uniqueness.
 * @param hashSecret This is the 'secret' used for generating and verifying the hashes
 * @param userId This is the user ID of the user in the host platform. This is the ID that you give to your own users, not the ID that ConvoStack uses internally. Set to null if not available or used with ConvoStack. You must provide at least an email or userId when using user verification. We recommend providing a user ID in case you allow users to change/update their email addresses.
 * @param email User email address. Set to null if not available or used with ConvoStack. You must provide at least an email or userId when using user verification
 * @param name User's name. Set to null if not available or used with ConvoStack
 */
const generateVerificationHash = (hashSecret: string, userId: string | null, email: string | null, name: string | null): string => {
    if (!hashSecret) {
        throw new Error("user data hash verification failed because no secret was provided");
    }
    // Configure the hash
    const hmac = crypto.createHmac("sha256", hashSecret);
    // Setup the payload. Pay special attention to the handling of null data, newlines, and the absence of a trailing newline. Since hashes are exact, the format must follow the requirements exactly.
    const payload = `userId:${userId ? userId : "null"}\nemail:${email ? email : "null"}\n${name ? name : "null"}`;
    // Add the payload to the hash
    hmac.update(payload);
    // Return the string hash
    return hmac.digest("hex");
}
```

### Invalidating hashes

In the event that you need to invalidate previously-issued user data verification hashes, you just change the secret
that you pass to the ConvoStack backend and new `login` operations with old hashes will instantly start failing.

## Building your own authentication strategy

While the default `AuthJWT` strategy should be sufficient for most use cases, we encourage you to write and contribute
additional authentication strategies.

To build a custom strategy, you must implement the `convostack/auth.IAuthProvider` interface. We suggest checking out
the `AuthJWT` strategy as a reference implementation.

Please note that unless your strategy has a notion of 'access' and 'refresh' tokens, it might not be compatible with the
built-in ConvoStack frontend.
