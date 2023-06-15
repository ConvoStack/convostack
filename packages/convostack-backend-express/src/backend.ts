import * as express from "express";
import {IStorageEngine, IConversationEventServiceOptions} from "@convostack/models";
import {IAuthProvider} from "@convostack/auth";
import "reflect-metadata";
import {
    ApolloServer,
    Config as ApolloServerConfig,
    ExpressContext as ApolloServerExpressContext,
    gql
} from "apollo-server-express";
import {useServer} from "graphql-ws/lib/use/ws";
import {readFileSync} from "fs";
import {join} from "path";
import {makeExecutableSchema} from "@graphql-tools/schema";
import resolvers from "./resolvers/index";
import {WebSocketServer} from "ws";
import {ConvoStackServices} from "./services";
import {IAgentManager} from "@convostack/agent";
import controllers from "./controllers";

export interface IConvoStackBackendConfiguration {
    basePath?: string;
    storage: IStorageEngine;
    auth: IAuthProvider;
    agents: IAgentManager;
    conversationEventServiceOptions?: IConversationEventServiceOptions
}

const typeDefs = gql`
    ${readFileSync(join(__dirname, "schema.graphql"), "utf8")}
`;
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export class ConvoStackBackendExpress {
    private services: ConvoStackServices;

    constructor(private config: IConvoStackBackendConfiguration) {
        this.services = new ConvoStackServices(config);
    }

    private getCleanBasePath() {
        let basePath = this.config.basePath;
        if (!basePath) {
            basePath = "/";
        }
        if (!basePath.endsWith("/")) {
            basePath += "/";
        }
        if (!basePath.startsWith("/")) {
            basePath = "/" + basePath;
        }
        return basePath;
    }

    async init(app: express.Express, httpServer: any, apolloServerOptions: Partial<ApolloServerConfig<ApolloServerExpressContext>> = {}) {
        const basePath = this.getCleanBasePath();
        const server = new ApolloServer({
            ...apolloServerOptions,
            schema,
            cache: "bounded",
            context: async ({req}) => {
                const authCtx = await this.config.auth.getGQLAuthContextHTTP(req);
                return {...authCtx, services: this.services, req};
            },
        });
        await server.start();
        server.applyMiddleware({app, path: basePath + "graphql"});

        useServer({
            schema,
            context: async ({connectionParams}) => {
                const authCtx = await this.config.auth.getGQLAuthContextWS(connectionParams);
                return {...authCtx, services: this.services, connectionParams};
            }
        }, new WebSocketServer({
            // This is the `httpServer` we created in a previous step.
            server: httpServer,
            // Pass a different path here if app.use
            // serves expressMiddleware at a different path
            path: basePath + "graphql"
        }));
    }

    async addRestApi(app: express.Express) {
        const basePath = this.getCleanBasePath();
        app.use(basePath + 'api*', express.json());
        const wrapper = (ctr: (req: any, res: any, ctx: any) => any, mustAuthUser: boolean) => {
            return async (req, res) => {
                try {
                    const authCtx = await this.config.auth.getGQLAuthContextHTTP(req)
                    if (mustAuthUser && !authCtx.user) {
                        res.status(401)
                        res.json({
                            success: false,
                            message: "This route requires authentication"
                        })
                        return
                    }
                    await ctr(req, res, {...authCtx, services: this.services, req})
                } catch (err) {
                    console.error('[ConvoStack] Controller error: ', err)
                    res.status(500)
                    res.json({
                        success: false,
                        message: "Internal server error"
                    })
                }
            }
        }
        app.post(basePath + 'api/actions/sendMessage', wrapper(controllers.sendMessageController, true))
    }
}