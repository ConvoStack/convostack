import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IGQLContext } from '../services/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AgentMetadata: ResolverTypeWrapper<AgentMetadata>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  AuthTokenData: ResolverTypeWrapper<AuthTokenData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Conversation: ResolverTypeWrapper<Conversation>;
  ConversationEvent: ResolverTypeWrapper<ConversationEvent>;
  ConversationListItem: ResolverTypeWrapper<ConversationListItem>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SendMessageResponse: ResolverTypeWrapper<SendMessageResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AgentMetadata: AgentMetadata;
  AuthResponse: AuthResponse;
  AuthTokenData: AuthTokenData;
  Boolean: Scalars['Boolean'];
  Conversation: Conversation;
  ConversationEvent: ConversationEvent;
  ConversationListItem: ConversationListItem;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  Message: Message;
  MessageInput: MessageInput;
  Mutation: {};
  Query: {};
  SendMessageResponse: SendMessageResponse;
  String: Scalars['String'];
  Subscription: {};
};

export type AgentMetadataResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['AgentMetadata'] = ResolversParentTypes['AgentMetadata']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResponseResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  accessToken?: Resolver<ResolversTypes['AuthTokenData'], ParentType, ContextType>;
  anonymous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  anonymousId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['AuthTokenData'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthTokenDataResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['AuthTokenData'] = ResolversParentTypes['AuthTokenData']> = {
  expAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationEventResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['ConversationEvent'] = ResolversParentTypes['ConversationEvent']> = {
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationListItemResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['ConversationListItem'] = ResolversParentTypes['ConversationListItem']> = {
  agent?: Resolver<ResolversTypes['AgentMetadata'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MessageResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  conversationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  turn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, Partial<MutationLoginArgs>>;
  refreshAuth?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRefreshAuthArgs, 'refreshToken'>>;
  sendMessage?: Resolver<ResolversTypes['SendMessageResponse'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'message'>>;
  updateConversationContext?: Resolver<Maybe<ResolversTypes['Conversation']>, ParentType, ContextType, RequireFields<MutationUpdateConversationContextArgs, 'context' | 'conversationId'>>;
};

export type QueryResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getConversations?: Resolver<Maybe<Array<ResolversTypes['ConversationListItem']>>, ParentType, ContextType>;
};

export type SendMessageResponseResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['SendMessageResponse'] = ResolversParentTypes['SendMessageResponse']> = {
  conversationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = IGQLContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  subscribeConversationEvents?: SubscriptionResolver<ResolversTypes['ConversationEvent'], "subscribeConversationEvents", ParentType, ContextType, Partial<SubscriptionSubscribeConversationEventsArgs>>;
};

export type Resolvers<ContextType = IGQLContext> = {
  AgentMetadata?: AgentMetadataResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  AuthTokenData?: AuthTokenDataResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  ConversationEvent?: ConversationEventResolvers<ContextType>;
  ConversationListItem?: ConversationListItemResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SendMessageResponse?: SendMessageResponseResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

