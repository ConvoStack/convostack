import {IAgent, IAgentContext, IAgentCallbacks, IAgentResponse} from "@convostack/agent";
import axios, {AxiosResponse} from 'axios';

export class AgentHTTPClient implements IAgent {
    constructor(private url: string) {
    }

    reply(context: IAgentContext, callbacks?: IAgentCallbacks): Promise<IAgentResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const requestData = {
                    humanMessage: context.getHumanMessage(),
                    user: context.getUser(),
                    history: context.getHistory(),
                    contextArgs: context.getContextArgs()
                };

                // Send HTTP request to the proxy
                const response: AxiosResponse = await axios.post(this.url, requestData, {
                    responseType: 'stream'
                });

                const stream = response.data;
                let returned = false;
                let buffer = "";

                stream.on('data', data => {
                    buffer += data.toString();
                    let lineBreakIndex = buffer.indexOf('\n');
                    while (lineBreakIndex != -1) {
                        const line = buffer.substring(0, lineBreakIndex);
                        buffer = buffer.substring(lineBreakIndex + 1);

                        if (line.startsWith("{")) {
                            let msg = JSON.parse(line);
                            if (msg.content) {
                                returned = true;
                                resolve(msg);
                            } else {
                                callbacks.onMessagePart(msg);
                            }
                        } else {
                            // Ignore (this is an empty line or malformed JSON)
                        }

                        lineBreakIndex = buffer.indexOf('\n');
                    }
                });


                stream.on('end', () => {
                    if (!returned) {
                        resolve({
                            content: 'Upstream agent error (no response received)'
                        })
                    }
                });
            } catch (e) {
                console.error(e)
                reject(e)
            }
        })
    }
}
