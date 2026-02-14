import { ApolloServer } from "@apollo/server";
import { faker } from "@faker-js/faker";
import typeDefs from "../../typeDefs";
import { makeExecutableSchema } from "@graphql-tools/schema";

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

type ProjectDTO = {
  id: string;
  name: string;
  githubLink?: string;
  webLink?: string;
  skills: {
    logo: string;
  }[];
};

const projectData: ProjectDTO[] = [
  {
    id: "1",
    name: faker.word.words(6),
    githubLink: faker.internet.url(),
    webLink: faker.internet.url(),
    skills: [
      {
        logo: faker.image.url(),
      },
    ],
  },
  {
    id: "2",
    name: faker.word.words(6),
    githubLink: faker.internet.url(),
    webLink: faker.internet.url(),
    skills: [
      {
        logo: faker.image.url(),
      },
    ],
  },
];

type ProjectsResponse = {
  projects: ProjectDTO[];
};

const resolvers = {
  Query: {
    projects() {
      return projectData;
    },
  },
};

let server: ApolloServer;

beforeAll(async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  server = new ApolloServer({ schema });
  await server.start();
});

afterAll(async () => {
  await server.stop();
});

describe("Project - List", () => {
  it("should list all projects", async () => {
    const result = await server.executeOperation<ProjectsResponse>({
      query: LIST_PROJECTS,
    });

    if (result.body.kind !== "single") {
      throw new Error("Unexpected incremental response");
    }

    expect(result.body.singleResult.data).toEqual({
      projects: projectData,
    });
  });
});
