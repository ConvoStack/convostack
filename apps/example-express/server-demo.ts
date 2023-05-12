import {ConvoStackBackendExpress} from "@convostack/backend-express";
import express from "express";
import {StorageEnginePrismaSQLite} from "@convostack/storage-engine-prisma-sqlite";
import cors, {CorsOptions} from "cors";
import {AuthJWT} from "@convostack/auth-jwt";
import {createServer} from "http";
import * as dotenv from "dotenv";
import {DefaultAgentManager} from "@convostack/agent";
import {AgentEcho} from "@convostack/agent-echo";

dotenv.config();

const port = process.env.PORT || "3000";
const host = process.env.HOST || "localhost";
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
    const storage = new StorageEnginePrismaSQLite(process.env.DATABASE_URL);
    await storage.init();
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
                agent: new AgentEcho(),
                metadata: {
                    displayName: "Echo Agent",
                    primer: "This is demo echo agent. Write me a message, and I will send it back to you!",
                    humanRole: "Human",
                    aiRole: "AI"
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
    main();
} catch (err) {
    console.error(err);
}