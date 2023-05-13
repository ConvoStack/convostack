import {
    IConversation,
    IMessage,
    IUser,
    IStorageEngine,
    IUserFilter,
    IConversationFilter,
    IMessageFilter, IConversationOrderBy, IMessageOrderBy
} from "@convostack/models";
// Import from ../src so that post-build, it will still use the generated prisma client
import {PrismaClient, Prisma} from "../src/generated/client";
import * as path from "path";

export class StorageEnginePrismaSQLite implements IStorageEngine {
    private prisma: PrismaClient;

    constructor(dbUrl: string) {
        // Initially, strip the prefix
        if (dbUrl.startsWith("file:")) {
            dbUrl = dbUrl.substring(5);
        }
        // Check that the path is absolute or make it absolute
        if (!path.isAbsolute(dbUrl)) {
            dbUrl = path.resolve(process.cwd(), dbUrl);
        }
        // Setup prisma
        this.prisma = new PrismaClient({
            datasources: {
                db: {
                    url: "file:" + dbUrl
                }
            }
        });
    }

    async init() {
        await this.prisma.$connect();
    }

    async createUser(user: Partial<IUser>): Promise<IUser> {
        return this.prisma.user.create({data: user});
    }

    async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
        return this.prisma.user.update({where: {id}, data});
    }

    async findUser(filter: IUserFilter): Promise<IUser | null> {
        return this.prisma.user.findFirst({where: filter});
    }

    async deleteUser(id: string): Promise<void> {
        await this.prisma.user.delete({where: {id}});
    }

    async createConversation(
        conversation: Partial<IConversation>
    ): Promise<IConversation> {
        const conversationData: Prisma.ConversationCreateInput = {
            ...conversation,
            title: conversation.title,
            agent: conversation.agent,
            user: {connect: {id: conversation.userId}}
        };
        delete conversationData["userId"];
        return this.prisma.conversation.create({data: conversationData});
    }

    async updateConversation(
        id: string,
        data: Partial<IConversation>
    ): Promise<IConversation> {
        return this.prisma.conversation.update({where: {id}, data});
    }

    async findConversation(
        filter: IConversationFilter
    ): Promise<IConversation | null> {
        return this.prisma.conversation.findFirst({where: filter});
    }

    async findConversations(
        filter?: IConversationFilter,
        orderBy?: IConversationOrderBy,
        skip?: number,
        take?: number
    ): Promise<IConversation[]> {
        return this.prisma.conversation.findMany({
            where: filter,
            orderBy: orderBy,
            skip: skip,
            take: take
        });
    }

    async deleteConversation(id: string): Promise<void> {
        await this.prisma.conversation.delete({where: {id}});
    }

    async createMessage(message: Partial<IMessage>): Promise<IMessage> {
        const messageData: Prisma.MessageCreateInput = {
            ...message,
            content: message.content,
            turn: message.turn,
            role: message.role,
            pending: message.pending,
            conversation: {connect: {id: message.conversationId}},
            user: message.userId ? {connect: {id: message.userId}} : undefined
        };
        delete messageData["conversationId"];
        delete messageData["userId"];
        return this.prisma.message.create({data: messageData});
    }

    async updateMessage(id: string, data: Partial<IMessage>): Promise<IMessage> {
        return this.prisma.message.update({where: {id}, data});
    }

    async findMessage(filter: IMessageFilter): Promise<IMessage | null> {
        return this.prisma.message.findFirst({where: filter});
    }

    async findMessages(
        filter?: IMessageFilter,
        orderBy?: IMessageOrderBy,
        skip?: number,
        take?: number
    ): Promise<IMessage[]> {
        return this.prisma.message.findMany({
            where: filter,
            orderBy: orderBy,
            skip: skip,
            take: take
        });
    }

    async deleteMessage(id: string): Promise<void> {
        await this.prisma.message.delete({where: {id}});
    }
}

