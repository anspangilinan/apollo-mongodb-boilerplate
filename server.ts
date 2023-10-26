import {
  ExpressInitializer,
  ApolloServerInitializer,
  dbInitializer,
  preloadModels,
  WebSocketServerInitializer,
} from "./init";
import { createServer } from "http";
import { PORT } from "./env";

const startServer = async () => {
  const db = dbInitializer();
  preloadModels();

  const apolloServer = new ApolloServerInitializer();
  const expressApp = new ExpressInitializer();
  const httpServer = createServer(expressApp.app);
  new WebSocketServerInitializer({
    apolloServer: apolloServer.server,
    httpServer,
    graphqlSchema: apolloServer.schema,
  });
  await apolloServer.start();
  expressApp.applyApolloMiddleware(apolloServer.server);
  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`);
    console.log(
      `🚀 Websocket ready at :: ws://localhost:${PORT}/subscriptions`
    );
  });
};
startServer();
