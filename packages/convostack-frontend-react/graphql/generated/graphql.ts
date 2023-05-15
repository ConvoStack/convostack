import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type AgentMetadata = {
  __typename?: 'AgentMetadata';
  avatarUrl?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  key: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: AuthTokenData;
  anonymous: Scalars['Boolean'];
  anonymousId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  refreshToken: AuthTokenData;
  userId: Scalars['String'];
};

export type AuthTokenData = {
  __typename?: 'AuthTokenData';
  expAt: Scalars['Int'];
  token: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ConversationEvent = {
  __typename?: 'ConversationEvent';
  kind: Scalars['String'];
  payload: Scalars['JSON'];
};

export type ConversationListItem = {
  __typename?: 'ConversationListItem';
  agent: AgentMetadata;
  id: Scalars['String'];
  lastMessage?: Maybe<Message>;
  title: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  conversationId: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  pending: Scalars['Boolean'];
  role: Scalars['String'];
  turn: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  refreshAuth: AuthResponse;
  sendMessage: SendMessageResponse;
  updateConversationContext?: Maybe<Conversation>;
};


export type MutationLoginArgs = {
  anonymousId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationRefreshAuthArgs = {
  refreshToken: Scalars['String'];
};


export type MutationSendMessageArgs = {
  agent?: InputMaybe<Scalars['String']>;
  context?: InputMaybe<Scalars['JSON']>;
  conversationId?: InputMaybe<Scalars['String']>;
  message: MessageInput;
};


export type MutationUpdateConversationContextArgs = {
  context: Scalars['JSON'];
  conversationId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getConversations?: Maybe<Array<ConversationListItem>>;
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  conversationId: Scalars['String'];
  messageId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeConversationEvents: ConversationEvent;
};


export type SubscriptionSubscribeConversationEventsArgs = {
  agent?: InputMaybe<Scalars['String']>;
  context?: InputMaybe<Scalars['JSON']>;
  conversationId?: InputMaybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  anonymousId?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', anonymousId?: string | null, anonymous: boolean, email?: string | null, name?: string | null, userId: string, accessToken: { __typename?: 'AuthTokenData', token: string, expAt: number }, refreshToken: { __typename?: 'AuthTokenData', token: string, expAt: number } } };

export type RefreshAuthMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshAuthMutation = { __typename?: 'Mutation', refreshAuth: { __typename?: 'AuthResponse', anonymousId?: string | null, anonymous: boolean, email?: string | null, name?: string | null, userId: string, accessToken: { __typename?: 'AuthTokenData', token: string, expAt: number }, refreshToken: { __typename?: 'AuthTokenData', token: string, expAt: number } } };

export type SendMessageMutationVariables = Exact<{
  message: MessageInput;
  conversationId?: InputMaybe<Scalars['String']>;
  agent?: InputMaybe<Scalars['String']>;
  context?: InputMaybe<Scalars['JSON']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessageResponse', conversationId: string } };

export type UpdateConversationContextMutationVariables = Exact<{
  conversationId: Scalars['String'];
  context: Scalars['JSON'];
}>;


export type UpdateConversationContextMutation = { __typename?: 'Mutation', updateConversationContext?: { __typename?: 'Conversation', id?: string | null } | null };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations?: Array<{ __typename?: 'ConversationListItem', id: string, title: string, lastMessage?: { __typename?: 'Message', id: string, content?: string | null, userId?: string | null, createdAt?: string | null } | null, agent: { __typename?: 'AgentMetadata', key: string, displayName: string, avatarUrl?: string | null } }> | null };

export type SubscribeConversationEventsSubscriptionVariables = Exact<{
  conversationId?: InputMaybe<Scalars['String']>;
  agent?: InputMaybe<Scalars['String']>;
  context?: InputMaybe<Scalars['JSON']>;
}>;


export type SubscribeConversationEventsSubscription = { __typename?: 'Subscription', subscribeConversationEvents: { __typename?: 'ConversationEvent', kind: string, payload: any } };


export const LoginDocument = `
    mutation Login($email: String, $name: String, $hash: String, $anonymousId: String, $externalId: String) {
  login(
    email: $email
    name: $name
    hash: $hash
    anonymousId: $anonymousId
    externalId: $externalId
  ) {
    accessToken {
      token
      expAt
    }
    anonymousId
    refreshToken {
      token
      expAt
    }
    anonymous
    email
    name
    userId
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const RefreshAuthDocument = `
    mutation RefreshAuth($refreshToken: String!) {
  refreshAuth(refreshToken: $refreshToken) {
    accessToken {
      token
      expAt
    }
    anonymousId
    refreshToken {
      token
      expAt
    }
    anonymous
    email
    name
    userId
  }
}
    `;
export const useRefreshAuthMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RefreshAuthMutation, TError, RefreshAuthMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RefreshAuthMutation, TError, RefreshAuthMutationVariables, TContext>(
      ['RefreshAuth'],
      (variables?: RefreshAuthMutationVariables) => fetcher<RefreshAuthMutation, RefreshAuthMutationVariables>(client, RefreshAuthDocument, variables, headers)(),
      options
    );
export const SendMessageDocument = `
    mutation sendMessage($message: MessageInput!, $conversationId: String, $agent: String, $context: JSON) {
  sendMessage(
    message: $message
    conversationId: $conversationId
    agent: $agent
    context: $context
  ) {
    conversationId
  }
}
    `;
export const useSendMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SendMessageMutation, TError, SendMessageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SendMessageMutation, TError, SendMessageMutationVariables, TContext>(
      ['sendMessage'],
      (variables?: SendMessageMutationVariables) => fetcher<SendMessageMutation, SendMessageMutationVariables>(client, SendMessageDocument, variables, headers)(),
      options
    );
export const UpdateConversationContextDocument = `
    mutation updateConversationContext($conversationId: String!, $context: JSON!) {
  updateConversationContext(conversationId: $conversationId, context: $context) {
    id
  }
}
    `;
export const useUpdateConversationContextMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateConversationContextMutation, TError, UpdateConversationContextMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateConversationContextMutation, TError, UpdateConversationContextMutationVariables, TContext>(
      ['updateConversationContext'],
      (variables?: UpdateConversationContextMutationVariables) => fetcher<UpdateConversationContextMutation, UpdateConversationContextMutationVariables>(client, UpdateConversationContextDocument, variables, headers)(),
      options
    );
export const GetConversationsDocument = `
    query GetConversations {
  getConversations {
    id
    title
    lastMessage {
      id
      content
      userId
      createdAt
    }
    agent {
      key
      displayName
      avatarUrl
    }
  }
}
    `;
export const useGetConversationsQuery = <
      TData = GetConversationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetConversationsQueryVariables,
      options?: UseQueryOptions<GetConversationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetConversationsQuery, TError, TData>(
      variables === undefined ? ['GetConversations'] : ['GetConversations', variables],
      fetcher<GetConversationsQuery, GetConversationsQueryVariables>(client, GetConversationsDocument, variables, headers),
      options
    );
export const SubscribeConversationEventsDocument = `
    subscription subscribeConversationEvents($conversationId: String, $agent: String, $context: JSON) {
  subscribeConversationEvents(
    conversationId: $conversationId
    agent: $agent
    context: $context
  ) {
    kind
    payload
  }
}
    `;