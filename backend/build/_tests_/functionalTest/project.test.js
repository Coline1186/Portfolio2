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
const server_1 = require("@apollo/server");
const faker_1 = require("@faker-js/faker");
const typeDefs_1 = __importDefault(require("../../typeDefs"));
const schema_1 = require("@graphql-tools/schema");
const LIST_PROJECTS = `
  query Projects {
  projects {
    id
    name
    githubLink
    webLink 
    skills {
      logo
    }
  }
}
`;
const projectData = [
    {
        id: "1",
        name: faker_1.faker.word.words(6),
        githubLink: faker_1.faker.internet.url(),
        webLink: faker_1.faker.internet.url(),
        skills: [
            {
                logo: faker_1.faker.image.url(),
            },
        ],
    },
    {
        id: "2",
        name: faker_1.faker.word.words(6),
        githubLink: faker_1.faker.internet.url(),
        webLink: faker_1.faker.internet.url(),
        skills: [
            {
                logo: faker_1.faker.image.url(),
            },
        ],
    },
];
const resolvers = {
    Query: {
        projects() {
            return projectData;
        },
    },
};
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.default, resolvers });
    server = new server_1.ApolloServer({ schema });
    yield server.start();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield server.stop();
}));
describe("Project - List", () => {
    it("should list all projects", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield server.executeOperation({
            query: LIST_PROJECTS,
        });
        if (result.body.kind !== "single") {
            throw new Error("Unexpected incremental response");
        }
        expect(result.body.singleResult.data).toEqual({
            projects: projectData,
        });
    }));
});
