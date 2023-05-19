import { PubSub as InMemoryPubSub } from "graphql-subscriptions";
import { RedisPubSub } from "graphql-redis-subscriptions";
import * as LRU from "lru-cache";
import Redis, { RedisOptions } from "ioredis";
import { ConversationEvent } from "../generated/graphql";
import {
  CONVERSATION_EVENT_KIND_CONVERSATION_METADATA,
  CONVERSATION_EVENT_KIND_MESSAGE
} from "@convostack/shared";
import { IConversation, IMessage, IStorageEngine } from "@convostack/models";

export class ConversationEventService {
  private readonly pubSub: InMemoryPubSub | RedisPubSub;
  private readonly cache: LRU.LRUCache<string, ConversationEvent[]> | Redis;

  constructor(private storage: IStorageEngine) {
    // TODO use config eng here
    // if (process.env.NODE_ENV === "production") {
    //   const options: RedisOptions = {
    //     host: "localhost", // replace with your Redis host
    //     port: 6379 // replace with your Redis port
    //   };
    //
    //   this.pubSub = new RedisPubSub({
    //     connection: options
    //   });
    //
    //   this.cache = new Redis(options);
    // } else {
    //   this.pubSub = new InMemoryPubSub();
    //   this.cache = new LRU.LRUCache<string, ConversationEvent[]>({
    //     max: 1000,
    //   });
    // }
    this.pubSub = new InMemoryPubSub();
    this.cache = new LRU.LRUCache<string, ConversationEvent[]>({
      max: 1000,
    });
  }

  private async getConversationEvents(
    conversationId: string
  ): Promise<ConversationEvent[] | null> {
    if (this.cache instanceof LRU.LRUCache) {
      return this.cache.get(conversationId);
    } else {
      const conversationEventsJson = await this.cache.get(
        `conversation_${conversationId}`
      );
      if (conversationEventsJson) {
        return JSON.parse(conversationEventsJson) as ConversationEvent[];
      }
    }
    return null;
  }

  private async setConversationEvents(
    conversationId: string,
    conversationEvents: ConversationEvent[]
  ): Promise<void> {
    if (this.cache instanceof LRU.LRUCache) {
      this.cache.set(conversationId, conversationEvents);
    } else {
      await this.cache.set(
        `conversation_${conversationId}`,
        JSON.stringify(conversationEvents)
      );
    }
  }

  private async loadConversationMessages(
    conversation: IConversation
  ): Promise<ConversationEvent[]> {
    const messages = await this.storage.findMessages({ conversationId: conversation.id }, { turn: "asc" });

    const conversationEvents = messages.map((message) =>
      this.messageToConversationEvent(message)
    );
    conversationEvents.unshift({
      kind: CONVERSATION_EVENT_KIND_CONVERSATION_METADATA,
      payload: conversation
    });

    await this.setConversationEvents(conversation.id, conversationEvents);

    return conversationEvents;
  }

  private messageToConversationEvent(message: IMessage): ConversationEvent {
    return {
      kind: CONVERSATION_EVENT_KIND_MESSAGE,
      payload: message
    };
  }

  async publishMessage(message: IMessage) {
    const conversationEvent = this.messageToConversationEvent(message);
    await this.publishConversationEvent(
      message.conversationId,
      conversationEvent,
      false
    );
  }

  async publishConversationEvent(
    conversationId: string,
    conversationEvent: ConversationEvent,
    ephemeral: boolean
  ) {
    // TODO do we need to await this?
    this.pubSub.publish(`conversation_${conversationId}`, {
      conversationEvent
    });

    // If this message is ephemeral (e.g., a token for a pending msg) then don't store it -- only share with currently connected clients
    if (ephemeral) {
      return;
    }

    const conversationEvents = await this.getConversationEvents(conversationId);
    if (conversationEvents) {
      conversationEvents.push(conversationEvent);
      await this.setConversationEvents(conversationId, conversationEvents);
    }
  }

  async subscribeToConversation(
    conversation: IConversation
  ): Promise<
    AsyncIterator<{ subscribeConversationEvents: ConversationEvent }>
  > {
    let conversationEvents = await this.getConversationEvents(conversation.id);
    if (!conversationEvents) {
      conversationEvents = await this.loadConversationMessages(conversation);
    }

    const iterator = this.pubSub.asyncIterator(
      `conversation_${conversation.id}`
    );

    return (async function* gen() {
      for (const event of conversationEvents) {
        yield { subscribeConversationEvents: event };
      }
      while (true) {
        const { value, done } = await iterator.next();
        if (!done) {
          yield { subscribeConversationEvents: value.conversationEvent };
        } else {
          break;
        }
      }
    })();
  }
}
