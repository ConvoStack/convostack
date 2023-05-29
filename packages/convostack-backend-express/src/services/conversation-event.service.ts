import {PubSub as InMemoryPubSub} from "graphql-subscriptions";
import * as LRU from "lru-cache";
import {ConversationEvent} from "../generated/graphql";
import {
    CONVERSATION_EVENT_KIND_CONVERSATION_METADATA,
    CONVERSATION_EVENT_KIND_MESSAGE
} from "@convostack/shared";
import {
    IConversation,
    IMessage,
    IStorageEngine,
    IConversationEventServicePubSubEngine,
    IConversationEventServiceCache,
    IConversationEventServiceOptions
} from "@convostack/models";

export class ConversationEventService {
    private readonly pubSub: IConversationEventServicePubSubEngine;
    private readonly cache: IConversationEventServiceCache;
    private readonly pubSubChannelPrefix: string;
    private readonly cachePrefix: string;

    constructor(private storage: IStorageEngine, opts: IConversationEventServiceOptions | null | undefined) {
        if (opts?.cachePrefix) {
            this.cachePrefix = opts.cachePrefix
        } else {
            this.cachePrefix = 'c_conv_events_'
        }
        if (opts?.pubSubChannelPrefix) {
            this.pubSubChannelPrefix = opts.pubSubChannelPrefix
        } else {
            this.pubSubChannelPrefix = 'ps_conv_events_'
        }
        if (opts?.pubSubEngine) {
            this.pubSub = opts.pubSubEngine;
        } else {
            this.pubSub = new InMemoryPubSub();
        }
        if (opts?.cache) {
            this.cache = opts.cache;
        } else {
            const lru = new LRU.LRUCache<string, string>({
                max: 1000,
            });
            this.cache = {
                get: async (key: string) => {
                    return lru.get(key)
                },
                set: async (key: string, value: string) => {
                    lru.set(key, value)
                },
            };
        }
    }

    private async getConversationEvents(
        conversationId: string
    ): Promise<ConversationEvent[] | null> {
        const conversationEventsJson = await this.cache.get(
            `${this.cachePrefix}${conversationId}`
        );
        if (conversationEventsJson) {
            return JSON.parse(conversationEventsJson) as ConversationEvent[];
        }
        return null;
    }

    private async setConversationEvents(
        conversationId: string,
        conversationEvents: ConversationEvent[]
    ): Promise<void> {
        await this.cache.set(
            `${this.cachePrefix}${conversationId}`,
            JSON.stringify(conversationEvents)
        );
    }

    private async loadConversationMessages(
        conversation: IConversation
    ): Promise<ConversationEvent[]> {
        const messages = await this.storage.findMessages({conversationId: conversation.id}, {turn: "asc"});

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
        await this.pubSub.publish(`${this.pubSubChannelPrefix}${conversationId}`, {
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
            `${this.pubSubChannelPrefix}${conversation.id}`
        );

        return (async function* gen() {
            for (const event of conversationEvents) {
                yield {subscribeConversationEvents: event};
            }
            while (true) {
                const {value, done} = await iterator.next();
                if (!done) {
                    yield {subscribeConversationEvents: value.conversationEvent};
                } else {
                    break;
                }
            }
        })();
    }
}
