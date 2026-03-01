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
const server_1 = require("@apollo/server");
const typeDefs_1 = __importDefault(require("../../typeDefs"));
const argon2 = __importStar(require("argon2"));
const User_entity_1 = require("../../entities/User.entity");
const datasource_test_1 = __importDefault(require("../../datasource/datasource_test"));
const schema_1 = require("@graphql-tools/schema");
jest.mock("../../datasource/datasource", () => ({
    __esModule: true,
    default: datasource_test_1.default,
}));
jest.mock("cookies", () => {
    return jest.fn().mockImplementation(() => {
        return {
            set: jest.fn(),
            get: jest.fn(),
        };
    });
});
jest.mock("../../utils/auth.utils", () => ({
    generateToken: jest.fn().mockResolvedValue("mocked_token"),
}));
let server;
const REGISTER_USER = `
mutation Register($input: InputRegister!) {
  register(input: $input) {
    id
    email
  }
}
`;
const LOGIN_USER = `
mutation Login($input: InputLogin!) {
  login(input: $input) {
    message
    success
  }
}
`;
const LOGOUT_USER = `
mutation Logout($input: InputLogout!) {
  logout(input: $input) {
    message
    success
  }
}
`;
const createMockContext = () => ({
    req: {},
    res: {},
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield datasource_test_1.default.initialize();
    const { default: userResolver } = yield Promise.resolve().then(() => __importStar(require("../../resolvers/user.resolver")));
    const baseSchema = (0, schema_1.makeExecutableSchema)({
        typeDefs: typeDefs_1.default,
        resolvers: [userResolver],
    });
    server = new server_1.ApolloServer({
        schema: baseSchema,
    });
    yield server.start();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield datasource_test_1.default.synchronize(true);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield datasource_test_1.default.destroy();
}));
describe("User - Register", () => {
    it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield server.executeOperation({
            query: REGISTER_USER,
            variables: {
                input: {
                    email: "test@example.com",
                    password: "Password123@",
                },
            },
        });
        if (result.body.kind !== "single") {
            throw new Error("Unexpected incremental response");
        }
        expect(result.body.singleResult.errors).toBeUndefined();
        const user = (_a = result.body.singleResult.data) === null || _a === void 0 ? void 0 : _a.register;
        expect(user === null || user === void 0 ? void 0 : user.id).toBeDefined();
        expect(user === null || user === void 0 ? void 0 : user.email).toBe("test@example.com");
    }));
});
describe("User - Login", () => {
    const userRepo = datasource_test_1.default.getRepository(User_entity_1.User);
    const plainPassword = "Password123@";
    it("should login an existant user", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const hashedPassword = yield argon2.hash("Password123@");
        yield userRepo.save({
            email: "test@example.com",
            password: hashedPassword,
        });
        const result = yield server.executeOperation({
            query: LOGIN_USER,
            variables: {
                input: {
                    email: "test@example.com",
                    password: plainPassword,
                },
            },
        }, {
            contextValue: createMockContext(),
        });
        if (result.body.kind !== "single") {
            throw new Error("Unexpected incremental response");
        }
        expect(result.body.singleResult.errors).toBeUndefined();
        const loginResponse = (_a = result.body.singleResult.data) === null || _a === void 0 ? void 0 : _a.login;
        expect(loginResponse === null || loginResponse === void 0 ? void 0 : loginResponse.success).toBe(true);
        expect(loginResponse === null || loginResponse === void 0 ? void 0 : loginResponse.message).toBe("Bienvenue");
    }));
    it("should not login with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const hashedPassword = yield argon2.hash("Password123@");
        yield userRepo.save({
            email: "test@example1.com",
            password: hashedPassword,
        });
        const result = yield server.executeOperation({
            query: LOGIN_USER,
            variables: {
                input: {
                    email: "test@example1.com",
                    password: "WrongPassword123@",
                },
            },
        }, {
            contextValue: createMockContext(),
        });
        if (result.body.kind !== "single") {
            throw new Error("Unexpected incremental response");
        }
        expect(result.body.singleResult.errors).toBeDefined();
        expect((_a = result.body.singleResult.errors) === null || _a === void 0 ? void 0 : _a[0].message).toBe("Email ou mot de passe incorrect");
    }));
});
