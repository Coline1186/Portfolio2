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
const schema_1 = require("@graphql-tools/schema");
const datasource_test_1 = __importDefault(require("../../datasource/datasource_test"));
const typeDefs_1 = __importDefault(require("../../typeDefs"));
const Skill_entity_1 = require("../../entities/Skill.entity");
jest.mock("../../datasource/datasource", () => ({
    __esModule: true,
    default: datasource_test_1.default,
}));
let server;
const CREATE_PROJECT = `
      mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) {
          id
          name
          image
          githubLink
          webLink
          skills {
            logo
          }
        }
      }
    `;
const UPDATE_PROJECT = `
      mutation UpdateProject($input: UpdateProjectInput!) {
        updateProject(input: $input) {
          id
          name
          image
          githubLink
          webLink
          skills {
            logo
          }
        }
      }
    `;
const DELETE_PROJECT = `
      mutation DeleteProject($deleteProjectId: ID!) {
        deleteProject(id: $deleteProjectId)
      }
     `;
function exec(query_1, variables_1) {
    return __awaiter(this, arguments, void 0, function* (query, variables, isAdmin = true) {
        const response = yield server.executeOperation({ query, variables }, isAdmin ? { contextValue: { user: { role: "ADMIN" } } } : undefined);
        if (response.body.kind !== "single") {
            throw new Error("Unexpected incremental response");
        }
        return response.body.singleResult;
    });
}
function createProject(skillId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exec(CREATE_PROJECT, {
            input: {
                name: "Initial Project",
                image: "initial.png",
                githubLink: "https://github.com/initial",
                webLink: "https://initial.test",
                skillIds: [skillId],
            },
        });
        return result.data.createProject;
    });
}
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield datasource_test_1.default.initialize();
    const { default: projectResolver } = yield Promise.resolve().then(() => __importStar(require("../../resolvers/project.resolver")));
    const baseSchema = (0, schema_1.makeExecutableSchema)({
        typeDefs: typeDefs_1.default,
        resolvers: [projectResolver],
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
    if (datasource_test_1.default.isInitialized) {
        yield datasource_test_1.default.destroy();
    }
}));
describe("Project - Create", () => {
    it("should create a new project", () => __awaiter(void 0, void 0, void 0, function* () {
        const skillRepo = datasource_test_1.default.getRepository(Skill_entity_1.Skill);
        const skill = yield skillRepo.save({
            name: "React",
            logo: "react.svg",
        });
        const result = yield exec(CREATE_PROJECT, {
            input: {
                name: "Test Project",
                image: "test.png",
                githubLink: "https://github.com/test/project",
                webLink: "https://project.test",
                skillIds: [skill.id],
            },
        });
        expect(result.errors).toBeUndefined();
        const project = result.data.createProject;
        expect(project).toMatchObject({
            name: "Test Project",
            image: "test.png",
            githubLink: "https://github.com/test/project",
            webLink: "https://project.test",
        });
        expect(project.skills).toHaveLength(1);
    }));
    it("should fail if project name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const skillRepo = datasource_test_1.default.getRepository(Skill_entity_1.Skill);
        const skill = yield skillRepo.save({
            name: "React",
            logo: "react.svg",
        });
        yield createProject(skill.id);
        const result = yield exec(CREATE_PROJECT, {
            input: {
                name: "Initial Project",
                image: "test.png",
                skillIds: [skill.id],
            },
        });
        expect(result.errors).toBeDefined();
    }));
    it("should fail if not connected", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield exec(CREATE_PROJECT, {
            input: {
                name: "Test Project",
                image: "test.png",
                skillIds: [],
            },
        }, false);
        expect(result.errors).toBeDefined();
    }));
});
describe("Project - Update", () => {
    it("should update a project", () => __awaiter(void 0, void 0, void 0, function* () {
        const skillRepo = datasource_test_1.default.getRepository(Skill_entity_1.Skill);
        const skill1 = yield skillRepo.save({
            name: "React",
            logo: "react.svg",
        });
        const skill2 = yield skillRepo.save({
            name: "Node",
            logo: "node.svg",
        });
        const created = yield createProject(skill1.id);
        const result = yield exec(UPDATE_PROJECT, {
            input: {
                id: created.id,
                name: "Updated Project",
                skillIds: [skill2.id],
            },
        });
        expect(result.errors).toBeUndefined();
        const updated = result.data.updateProject;
        expect(updated.name).toBe("Updated Project");
        expect(updated.skills[0].logo).toBe("node.svg");
    }));
    it("should fail if project does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield exec(UPDATE_PROJECT, {
            input: {
                id: "fake-id",
                name: "Updated",
            },
        });
        expect(result.errors).toBeDefined();
    }));
    it("should fail update if not connected", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield exec(UPDATE_PROJECT, {
            input: {
                id: "fake-id",
                name: "Should Fail",
            },
        }, false);
        expect(result.errors).toBeDefined();
    }));
});
describe("Project - Delete", () => {
    it("should delete a project", () => __awaiter(void 0, void 0, void 0, function* () {
        const skillRepo = datasource_test_1.default.getRepository(Skill_entity_1.Skill);
        const skill = yield skillRepo.save({
            name: "React",
            logo: "react.svg",
        });
        const created = yield createProject(skill.id);
        const result = yield exec(DELETE_PROJECT, {
            deleteProjectId: created.id,
        });
        expect(result.errors).toBeUndefined();
        expect(result.data.deleteProject).toBe(true);
    }));
    it("should fail delete if not connected", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield exec(DELETE_PROJECT, {
            deleteProjectId: "fake-id",
        }, false);
        expect(result.errors).toBeDefined();
    }));
    it("should fail if project name already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const skillRepo = datasource_test_1.default.getRepository(Skill_entity_1.Skill);
        const skill = yield skillRepo.save({
            name: "React",
            logo: "react.svg",
        });
        yield createProject(skill.id);
        const result = yield exec(CREATE_PROJECT, {
            input: {
                name: "Initial Project",
                skillIds: [skill.id],
            },
        });
        expect(result.errors).toBeDefined();
    }));
});
