---
id: "index"
title: "ConvoStack in Production "
sidebar_label: "ConvoStack in Production"
sidebar_position: 0.1
hide_table_of_contents: true
pagination_next: "production/backend-dockerfile"
---

# Running ConvoStack in Production

This document provides an overview of deploying and configuring ConvoStack in a production environment. It covers the
recommended setup for various components and references relevant documentation for further details.

## Caching and Pub/Sub with Redis

Anytime that you have more than one machine hosting the ConvoStack backend, you must use a central caching and pub/sub
system to ensure that messages are properly synced between machines. For caching and pub/sub functionality in
ConvoStack, it is recommended to use Redis. Redis is an in-memory data store that provides efficient caching and pub/sub
capabilities. One option for hosting Redis is Upstash, a managed Redis service that integrates with Fly.io. It also has
a generous free tier!

To connect ConvoStack to your Redis instance, refer to the ConvoStack documentation for instructions on configuring the
cache and pub/sub settings [here](../backend/cache-pub-sub-redis). Additionally, consult the Upstash/Fly.io
documentation for guidance on setting up and managing a Redis instance.

## Storage with PostgreSQL or MySQL

When it comes to persistent storage for ConvoStack, you have the option to use either PostgreSQL or MySQL. Both are
widely-used relational database systems that offer excellent performance and reliability.

While you are free to have ConvoStack use the same database as your app, we suggest creating a separate DB (can be on
the same server/instance) that will logically separate the ConvoStack tables and migration tracking from your own
application. This also helps to ensure that you won't encounter any issues with Prisma migrations if using the default
ConvoStack Postgres and MySQL storage engine implementations.

If you would like to use another storage backend or have your own custom data storage needs, we strongly suggest
implementing the handful of methods required by the `convostack/models.IStorageEngine` interface. If you end up building
your own backend,
we would really appreciate it if you share it with the community!

To set up ConvoStack with PostgreSQL or MySQL, follow the respective documentation [here](../backend/storage-engines).
These guides will walk you through the necessary steps to configure the database connection and migrations.

If you need assistance with PostgreSQL, refer to the PostgreSQL documentation, and for MySQL, consult the MySQL
documentation. These resources offer comprehensive information on installation, configuration, and usage of the
respective database systems.

## CORS and Server Configurations

To ensure proper security and access control, it is important to configure CORS (Cross-Origin Resource Sharing) and
server settings correctly for your ConvoStack deployment.

Since the ConvoStack backend has the option to attach to an existing Express server, you can

```typescript
// Import ConvoStack and your other dependencies...
// Import express and createServer
import { createServer } from "http";
import express from "express";
// Import cors (npm i -S cors)
import cors, { CorsOptions } from "cors";

// Configure CORS (nothing ConvoStack-specific here...)
const corsOptions: CorsOptions = {
  // Replace this list with your own sites
  origin: ["http://localhost:5173", "https://studio.apollographql.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Setup your own express server
const app = express();

// Add your own app logic, routes, middleware, etc.

// Setup CORS middleware app-wide
app.use(cors(corsOptions));

// Create an HTTP server based on your Express app
const httpServer = createServer(app);

// Setup the ConvoStack backend
const backend = new ConvoStackBackendExpress({
  // ConvoStack setup options...
});

// Initialize ConvoStack with your Express app
await backend.init(app, httpServer);

// Run your server
httpServer.listen(parseInt(port), host, () => {
  console.log(`Server is running on http://${host}:${port}/graphql`);
});
```

## Deployment Resources

### Deploying with Fly.io

To deploy ConvoStack using Fly.io, check out [this guide](./deploy-with-fly-io).

### Best Postgres free tier option: Neon

Looking for a free Postgres option? We recommend trying [Neon](https://neon.tech/) with the Fly.io deployment.

### Best Redis free tier option: Upstash

Looking for a free Redis option? We recommend trying [Upstash](https://fly.io/docs/reference/redis/) with the Fly.io
deployment.
