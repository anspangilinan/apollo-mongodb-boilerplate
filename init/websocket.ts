import { ApolloServer } from "@apollo/server";
import { GraphQLSchema } from "graphql";
import { Server } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import context from "./context";

interface IWebSocketServerInitializer {
  apolloServer: ApolloServer;
  httpServer: Server;
  graphqlSchema: GraphQLSchema;
}

export class WebSocketServerInitializer {
  public wsServer: WebSocketServer;

  constructor({
    apolloServer,
    httpServer,
    graphqlSchema,
  }: IWebSocketServerInitializer) {
    // Creating the WebSocket server
    this.wsServer = new WebSocketServer({
      server: httpServer,
      path: "/subscriptions",
    });

    // Save the returned server's info so we can shutdown this server later
    const serverCleanup = useServer(
      { schema: graphqlSchema, context },
      this.wsServer
    );

    const apolloPlugins = [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ];
    apolloPlugins.forEach((plugin) => {
      apolloServer.addPlugin(plugin);
    });
  }
}
