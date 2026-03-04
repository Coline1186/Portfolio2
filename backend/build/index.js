"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cookies_1 = __importDefault(require("cookies"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const jose_1 = require("jose");
const user_logic_1 = require("./utils/user.logic");
const datasource_1 = __importDefault(require("./datasource/datasource"));
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
if (process.env.NODE_ENV === "production") {
    // Required behind reverse proxies (Render, Railway, etc.) for secure cookie behavior.
    app.set("trust proxy", 1);
}
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    introspection: true,
    plugins: [
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
    ],
});
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
].filter((origin) => origin !== undefined);
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
const commonMiddleware = [
    (0, cors_1.default)(corsOptions),
    express_1.default.json({ limit: "10mb" }),
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        app.use("/graphql", ...commonMiddleware, (0, express4_1.expressMiddleware)(server, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req, res }) {
                let user = null;
                const cookies = new cookies_1.default(req, res);
                const token = cookies.get("token");
                if (token) {
                    try {
                        const verify = yield (0, jose_1.jwtVerify)(token, new TextEncoder().encode(`${process.env.JWT_SECRET}`));
                        user = yield (0, user_logic_1.findUserByEmail)(verify.payload.email);
                    }
                    catch (error) {
                        console.error("JWT verification failed:", error);
                        if (error.code === "ERR_JWT_EXPIRED") {
                            console.warn("Token expired— suppression recommandée côté client.");
                        }
                    }
                }
                return { req, res, user };
            }),
        }));
        yield datasource_1.default.initialize();
        console.log("DB initialized!");
        if (process.env.NODE_ENV === "production") {
            yield datasource_1.default.runMigrations();
            console.log("Migrations executed");
        }
        const PORT = Number(process.env.PORT) || 4000;
        yield new Promise((resolve) => httpServer.listen({
            port: PORT,
            host: "0.0.0.0",
        }, resolve));
        console.log(`🚀 Server ready at ${process.env.BACKEND_URL} && ${process.env.PORT}`);
    });
}
main();
