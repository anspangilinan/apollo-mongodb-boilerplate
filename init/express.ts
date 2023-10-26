import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import express from "express";
// import { authenticate } from "../src/passport";
import { json } from "body-parser";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import { FILES, PORT } from "../env";
import context from "./context";

const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const INITIAL_MIDDLEWARES = [
  json(),
  cors({
    origin: true,
    optionsSuccessStatus: HttpStatusCodes.OK,
    maxAge: 0,
    allowedHeaders: [
      "Origin",
      "Authorization",
      "Content-Type",
      "X-Requested-With",
      "X-Request-Id",
      "Sentry-Trace",
      "X-Tab-Session-Id",
      "Apollo-Require-Preflight",
    ],
  }),
  graphqlUploadExpress({
    maxFileSize: FILES.MAX_FILE_SIZE,
    maxFiles: FILES.MAX_FILE_COUNT,
  }),
];
export class ExpressInitializer {
  public app: express.Express;
  constructor() {
    this.app = express();
    this.loadInitialMiddlewares();
  }

  loadInitialMiddlewares() {
    this.app.use(...INITIAL_MIDDLEWARES);
  }

  applyApolloMiddleware(apolloServer: ApolloServer) {
    this.app.use(
      "/graphql",
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          // const token = req.headers.authorization?.split(" ")[1];
          // if (token) {
          //   const decoded = jwt.verify(token, JWT.SECRET_KEY);
          //   const user = await User.findById(decoded.id);
          //   return { user };
          // }
          return {
            ...context,
          };
        },
      })
    );
  }

  start() {
    this.app.listen({ port: PORT }, () => {
      console.log(`Service endpoint :: http://localhost:${PORT}/graphql`);
    });
  }
}
