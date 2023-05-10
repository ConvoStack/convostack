import express from "express";

/**
 * echoHandler provides an express handler that will echo the agent input back as a server-side events stream.
 * This route is compatible with the agent-sse library. This route requires the express.json() (or similar) middleware
 * to ensure that the JSON request body is parsed into an object. Use this if you want to run an echo server on an existing Express app.
 *
 * @param req - Express Request
 * @param res - Express Response
 *
 * @example
 * ```
 * app.post('/api/chat', express.json(), echoHandler);
 * ```
 */
export const sseEchoHandler = (req: express.Request, res: express.Response) => {
  const humanMessage: string = req.body.humanMessage.content;
  const words = humanMessage.split(" ");

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive"
  });

  const sendData = (data: string) => {
    res.write(`data: ${data}\n\n`);
  };

  if (words.length < 1) {
    sendData(JSON.stringify({ contentChunk: "WARN: NO INPUT RECEIVED" }));
    sendData("[DONE]");
    res.end();
    return;
  }

  setTimeout(() => {
    words.forEach((word, index) => {
      setTimeout(() => {
        if (index === words.length - 1) {
          sendData(JSON.stringify({ contentChunk: word }));
          sendData("[DONE]");
          res.end();
        } else {
          sendData(JSON.stringify({ contentChunk: word + " " }));
        }
      }, 100 * index);
    });
  }, 500);
};

/**
 * serveDev provides an express handler that will echo the agent input back as a server-side events stream.
 * This route is compatible with the agent-sse library. This route requires the express.json() (or similar) middleware
 * to ensure that the JSON request body is parsed into an object. Use this if you want to run an echo server on an existing Express app.
 *
 * @param port - Port to run the Express app on
 * @param host - Host to run the Express app on (usually localhost, 127.0.0.1, or 0.0.0.0)
 * @param path - Path to run the echoHandler on
 *
 * @example
 * ```
 * await serveDev(3001, 'localhost', '/api/chat');
 * ```
 */
export const serveEchoAgentDev = async (port: number, host: string = "localhost", path: string = "/api/chat") => {
  const app = express();
  app.use(express.json());
  app.post(path, sseEchoHandler);
  await app.listen(port, () => {
    console.log(`Echo agent server listening at http://${host}:${port}${path}`);
  });
};
