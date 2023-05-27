export interface IUser {
    id: string;
    externalId?: string;
    anonymousId?: string;
    email?: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IConversation {
    id: string;
    title: string;
    agent: string;
    primer?: string;
    context: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessage {
    id: string;
    content: string;
    turn: number;
    role: string;
    pending: boolean;
    conversationId: string;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserFilter {
    id?: string;
    externalId?: string;
    anonymousId?: string;
    email?: string;
}

export interface IConversationFilter {
    id?: string;
    title?: string;
    agent?: string;
    primer?: string;
    userId?: string;
}

export interface IMessageFilter {
    id?: string;
    content?: string;
    turn?: number;
    role?: string;
    pending?: boolean;
    conversationId?: string;
    userId?: string;
}

export type IConversationOrderBy = Partial<Record<keyof IConversation, "asc" | "desc">>
export type IMessageOrderBy = Partial<Record<keyof IMessage, "asc" | "desc">>

export interface IStorageEngine {
    createUser(user: Partial<IUser>): Promise<IUser>;

    updateUser(id: string, data: Partial<IUser>): Promise<IUser>;

    findUser(filter: IUserFilter): Promise<IUser | null>;

    deleteUser(id: string): Promise<void>;

    createConversation(conversation: Partial<IConversation>): Promise<IConversation>;

    updateConversation(id: string, data: Partial<IConversation>): Promise<IConversation>;

    findConversation(filter: IConversationFilter): Promise<IConversation | null>;

    findConversations(
        filter?: IConversationFilter,
        orderBy?: IConversationOrderBy,
        skip?: number,
        take?: number
    ): Promise<IConversation[]>;

    deleteConversation(id: string): Promise<void>;

    createMessage(message: Partial<IMessage>): Promise<IMessage>;

    updateMessage(id: string, data: Partial<IMessage>): Promise<IMessage>;

    findMessage(filter: IMessageFilter): Promise<IMessage | null>;

    findMessages(
        filter?: IMessageFilter,
        orderBy?: IMessageOrderBy,
        skip?: number,
        take?: number
    ): Promise<IMessage[]>;

    deleteMessage(id: string): Promise<void>;
}