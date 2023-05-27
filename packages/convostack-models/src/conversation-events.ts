export interface IConversationEventServiceOptions {
    pubSubEngine?: IConversationEventServicePubSubEngine;
    pubSubChannelPrefix?: string;
    cache?: IConversationEventServiceCache;
    cachePrefix?: string;
}

export interface IConversationEventServiceCache {
    get(key: string): Promise<string>

    set(key: string, value: string): Promise<any>
}

export interface IConversationEventServicePubSubEngine {
    publish(triggerName: string, payload: any): Promise<void>;
    subscribe(triggerName: string, onMessage: Function, options: Object): Promise<number>;
    unsubscribe(subId: number): any;
    asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>;
}
