"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const User_entity_1 = require("../entities/User.entity");
const datasource_1 = __importDefault(require("../datasource/datasource"));
const validate_entity_1 = require("../utils/validate-entity");
const argon2 = __importStar(require("argon2"));
const cookies_1 = __importDefault(require("cookies"));
const auth_utils_1 = require("../utils/auth.utils");
const userRepo = datasource_1.default.getRepository(User_entity_1.User);
const isProduction = process.env.NODE_ENV === "production";
const authCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 2 * 60 * 60 * 1000, // 2h
};
exports.default = {
    Query: {
        userInfo: (_p, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield userRepo.findOneBy({ id: args.id });
        })
    },
    Mutation: {
        register: (_p_1, _a) => __awaiter(void 0, [_p_1, _a], void 0, function* (_p, { input }) {
            const newUser = userRepo.create(Object.assign(Object.assign({}, input), { role: User_entity_1.UserRole.ADMIN }));
            yield (0, validate_entity_1.validateEntity)(newUser);
            return userRepo.save(newUser);
        }),
        login: (_p, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield userRepo.findOneBy({ email: args.input.email });
            if (!user) {
                throw new Error("Email ou mot de passe incorrect");
            }
            const validPassword = yield argon2.verify(user.password, args.input.password);
            if (!validPassword) {
                throw new Error("Email ou mot de passe incorrect");
            }
            const token = yield (0, auth_utils_1.generateToken)(user.email);
            let cookies = new cookies_1.default(ctx.req, ctx.res);
            cookies.set("token", token, authCookieOptions);
            return { message: "Bienvenue", success: true };
        }),
        logout: (_p, _args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            let cookies = new cookies_1.default(ctx.req, ctx.res);
            cookies.set("token", "", Object.assign(Object.assign({}, authCookieOptions), { maxAge: 0 }));
            return { message: "Déconnexion réussie", success: true };
        }),
        checkToken: (_p, _args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.user)
                return null;
            return ctx.user ? { email: ctx.user.email, role: ctx.user.role } : null;
        }),
    },
};
