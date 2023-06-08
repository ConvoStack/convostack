import WebSocket from 'ws';
import retry from 'retry';
import {
    IAgent,
    IAgentContext,
    IAgentCallbacks,
    IAgentContextHistory,
    IAgentContextUser,
    IAgentHumanMessage, IAgentMessagePart
} from "@convostack/agent";

export const playground = (agent: IAgent) => {
    const proxy = new PlaygroundAgentProxy(agent)
    proxy.connect()
}

interface IProxyMessage {
    id: string;
    body: any;
    complete: boolean;
    status: number;
}

export class PlaygroundAgentProxy {
    private ws: WebSocket;
    private agent: IAgent;
    private operation: retry.RetryOperation;
    private proxyUrl: string = 'wss://playground-proxy.convostack.ai/agent';

    constructor(agent: IAgent) {
        this.agent = agent;

        // Retry configuration
        const retryOptions: retry.OperationOptions = {
            retries: 10,
            factor: 2,
            minTimeout: 1 * 1000, // 1 second
            maxTimeout: 60 * 1000, // 1 minute
            randomize: true,
        };

        this.operation = retry.operation(retryOptions);
    }

    public setProxyUrl(url: string) {
        this.proxyUrl = url;
    }

    public connect() {
        let agentId = '';
        this.operation.attempt(currentAttempt => {
            this.ws = new WebSocket(this.proxyUrl);

            this.ws.on('open', () => {
                console.log('Connected to proxy');
            });

            this.ws.on('message', async (data: WebSocket.Data) => {
                const dataStr = data.toString();
                if (dataStr.startsWith("AGENT_ID:")) {
                    agentId = dataStr.replace('AGENT_ID:', '')
                    this.operation.reset()
                    // TODO Improve formatting
                    console.log(`[ConvoStack] 🚀 Interact with your Agent live now: https://playground.convostack.ai/dev?agent=pxy::${encodeURIComponent(agentId)}`);
                } else {
                    const message: IProxyMessage = JSON.parse(dataStr);
                    // Delegate request handling to the agent
                    const context: IAgentContext = {
                        getContextArgs: () => {
                            return message.body.contextArgs;
                        },
                        getHistory: (): IAgentContextHistory => {
                            return message.body.history;
                        },
                        getUser: (): IAgentContextUser => {
                            return message.body.user;
                        },
                        getHumanMessage: (): IAgentHumanMessage => {
                            return message.body.humanMessage;
                        }
                    };
                    const callbacks: IAgentCallbacks = {
                        onMessagePart: (msgPart: IAgentMessagePart): any => {
                            this.ws.send(JSON.stringify({
                                id: message.id,
                                body: msgPart,
                                complete: false,
                            }));
                        }
                    };
                    try {
                        let agentResp = await this.agent.reply(context, callbacks);
                        this.ws.send(JSON.stringify({
                            id: message.id,
                            body: agentResp,
                            complete: true,
                            status: 200,
                        }));
                    } catch (e) {
                        console.error(e);
                        this.ws.send(JSON.stringify({
                            id: message.id,
                            body: {content: 'Agent error'},
                            complete: true,
                            status: 500,
                        }));
                    }
                }
            });

            this.ws.on('close', (code, reason) => {
                console.log('Disconnected from proxy:', reason);
                if (this.operation.retry(new Error(`${reason}`))) {
                    console.log(`Attempt ${currentAttempt}: Retrying...`);
                } else {
                    console.log('Failed to connect to proxy after ' + this.operation.attempts() + ' attempts');
                }
            });

            this.ws.on('error', error => {
                console.error('WebSocket error:', error);
            });
        });
    }
}
