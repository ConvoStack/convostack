---
id: "index"
title: "Overview"
sidebar_label: "Overview"
sidebar_position: 0.1
---

# ConvoStack GraphQL API

Behind the scenes, ConvoStack implements a GraphQL API (HTTP and WS-based subscriptions) to facilitate communication
between the frontend and backend. This documentation provides an overview of the ConvoStack GraphQL API and its
available endpoints.

## GraphQL API Playground

You can explore and interact with the ConvoStack GraphQL API using the Apollo Studio
[GraphQL Playground](https://studio.apollographql.com/public/ConvoStack-Playground-Schema/variant/current) sandbox.
The Playground provides a user-friendly interface to send GraphQL queries, mutations, and subscriptions to the
ConvoStack backend server. It also includes auto-complete suggestions and documentation for the available API schema.

## Implementing the GraphQL Spec

If you prefer not to use the ConvoStack backend server implementation, you are free to implement the GraphQL
specification defined in
the [ConvoStack GitHub repository](https://github.com/ConvoStack/convostack/blob/master/packages/schema-graphql/schema.graphql).
The repository contains the schema.graphql file, which defines the ConvoStack API schema and its available types,
queries, mutations, and subscriptions. You can use this schema to build your own backend server and interact with
ConvoStack using GraphQL.

To learn more about the ConvoStack GraphQL API and its usage, refer to the examples provided in the following sections.
