import {ConvoStackBackendExpress} from "convostack/backend-express";
import express from "express";
import {StorageEnginePrismaSQLite} from "convostack/storage-engine-prisma-sqlite";
import cors, {CorsOptions} from "cors";
import {AuthJWT} from "convostack/auth-jwt";
import {createServer} from "http";
import * as dotenv from "dotenv";
import {DefaultAgentManager} from "convostack/agent";
import {AgentSSEClient} from "convostack/agent-sse";
import {serveEchoAgentDev} from "convostack/agent-sse-echo-server";
import {IStorageEngine} from "convostack/models";
import {StorageEnginePrismaPostgres} from "convostack/storage-engine-prisma-postgres";
import {StorageEnginePrismaMySQL} from "convostack/storage-engine-prisma-mysql";

dotenv.config();

const port = process.env.PORT || "3000";
const host = process.env.HOST || "localhost";
const ssePort = process.env.SSE_PORT || "3005";
const sseHost = process.env.SSE_HOST || "localhost";
console.log("Configuring server...");

const corsOptions: CorsOptions = {
    origin: ["http://localhost:5173", "https://studio.apollographql.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

const main = async () => {
    const app = express();
    app.use(cors(corsOptions));
    const httpServer = createServer(app);
    let storage: IStorageEngine;
    switch (process.env.STORAGE_ENGINE) {
        case 'sqlite':
            storage = new StorageEnginePrismaSQLite(process.env.DATABASE_URL);
            await (storage as StorageEnginePrismaSQLite).init();
            break;
        case 'postgres':
            storage = new StorageEnginePrismaPostgres(process.env.DATABASE_URL);
            await (storage as StorageEnginePrismaPostgres).init();
            break;
        case 'mysql':
            storage = new StorageEnginePrismaMySQL(process.env.DATABASE_URL);
            await (storage as StorageEnginePrismaMySQL).init();
            break;
        default:
            throw new Error(`Invalid storage engine: ${process.env.STORAGE_ENGINE}`)
    }
    const backend = new ConvoStackBackendExpress({
        basePath: "/",
        storage,
        auth: new AuthJWT(storage, {
            jwtSecret: process.env.JWT_SECRET,
            userDataVerificationSecret: process.env.USER_VERIFICATION_HASH_SECRET,
            allowAnonUsers: process.env.ALLOW_ANONYMOUS_USERS == "true",
            requireUserVerificationHash: !(
                process.env.REQUIRE_USER_VERIFICATION_HASH == "false"
            )
        }),
        agents: new DefaultAgentManager({
            "default": {
                agent: new AgentSSEClient(`http://${sseHost}:${ssePort}/api/chat`),
                metadata: {
                    displayName: "Echo Agent",
                    primer: "This is demo echo agent. Write me a message, and I will send it back to you!"
                }
            }
        }, "default")
    });

    await backend.init(app, httpServer);

    console.log(`Starting server on port ${port}...`);
    httpServer.listen(parseInt(port), host, () => {
        console.log(`Server is running on http://${host}:${port}/graphql`);
    });
};

try {
    serveEchoAgentDev(parseInt(ssePort), sseHost, "/api/chat");
    main();
} catch (err) {
    console.error(err);
}