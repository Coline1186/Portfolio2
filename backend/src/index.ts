import "module-alias/register";
import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import Cookies from "cookies";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { User } from "./entities/User.entity";
import { jwtVerify } from "jose";
import { findUserByEmail } from "./utils/user.logic";
import datasource from "./datasource/datasource";

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
}

export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => origin !== undefined);

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

const commonMiddleware = [
  cors<cors.CorsRequest>(corsOptions),
  express.json({ limit: "10mb" }),
];

async function main() {
  await server.start();

  app.use(
    "/graphql",
    ...commonMiddleware,
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: User | null = null;

        const cookies = new Cookies(req, res);
        const token = cookies.get("token");

        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(`${process.env.JWT_SECRET}`),
            );
            user = await findUserByEmail(verify.payload.email);
          } catch (error: unknown) {
            console.error("JWT verification failed:", error);

            if (error instanceof Error && "code" in error && error.code === "ERR_JWT_EXPIRED") {
              console.warn(
                "Token expired— suppression recommandée côté client.",
              );
            }
          }
        }

        return { req, res, user };
      },
    }),
  );

  await datasource.initialize();
  console.log("DB initialized!");

  if (process.env.NODE_ENV === "production") {
    await datasource.runMigrations();
    console.log("Migrations executed");
  }

  const PORT = Number(process.env.PORT) || 4000;

  await new Promise<void>((resolve) =>
    httpServer.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      resolve,
    ),
  );
  console.log(
    `🚀 Server ready at ${process.env.BACKEND_URL} && ${process.env.PORT}`,
  );
}
main();
