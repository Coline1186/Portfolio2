import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import datasource_test from "../../datasource/datasource_test";
import typeDefs from "../../typeDefs";
import { Skill } from "../../entities/Skill.entity";

jest.mock("../../datasource/datasource", () => ({
  __esModule: true,
  default: datasource_test,
}));

let server: ApolloServer;

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

async function exec(query: string, variables?: any, isAdmin = true) {
  const response = await server.executeOperation(
    { query, variables },
    isAdmin ? { contextValue: { user: { role: "ADMIN" } } } : undefined,
  );

  if (response.body.kind !== "single") {
    throw new Error("Unexpected incremental response");
  }

  return response.body.singleResult;
}

async function createProject(skillId: string) {
  const result = await exec(CREATE_PROJECT, {
    input: {
      name: "Initial Project",
      image: "initial.png",
      githubLink: "https://github.com/initial",
      webLink: "https://initial.test",
      skillIds: [skillId],
    },
  });

  return (result.data as any).createProject;
}

beforeAll(async () => {
  await datasource_test.initialize();

  const { default: projectResolver } = await import(
    "../../resolvers/project.resolver"
  );

  const baseSchema = makeExecutableSchema({
    typeDefs,
    resolvers: [projectResolver],
  });

  server = new ApolloServer({
    schema: baseSchema,
  });

  await server.start();
});

beforeEach(async () => {
  await datasource_test.synchronize(true);
});

afterAll(async () => {
  if (datasource_test.isInitialized) {
    await datasource_test.destroy();
  }
});

describe("Project - Create", () => {
  it("should create a new project", async () => {
    const skillRepo = datasource_test.getRepository(Skill);

    const skill = await skillRepo.save({
      name: "React",
      logo: "react.svg",
    });

    const result = await exec(CREATE_PROJECT, {
      input: {
        name: "Test Project",
        image: "test.png",
        githubLink: "https://github.com/test/project",
        webLink: "https://project.test",
        skillIds: [skill.id],
      },
    });

    expect(result.errors).toBeUndefined();

    const project = (result.data as any).createProject;

    expect(project).toMatchObject({
      name: "Test Project",
      image: "test.png",
      githubLink: "https://github.com/test/project",
      webLink: "https://project.test",
    });

    expect(project.skills).toHaveLength(1);
  });

  it("should fail if project name already exists", async () => {
    const skillRepo = datasource_test.getRepository(Skill);
    const skill = await skillRepo.save({
      name: "React",
      logo: "react.svg",
    });

    await createProject(skill.id);

    const result = await exec(CREATE_PROJECT, {
      input: {
        name: "Initial Project",
        image: "test.png",
        skillIds: [skill.id],
      },
    });

    expect(result.errors).toBeDefined();
  });

  it("should fail if not connected", async () => {
    const result = await exec(
      CREATE_PROJECT,
      {
        input: {
          name: "Test Project",
          image: "test.png",
          skillIds: [],
        },
      },
      false,
    );

    expect(result.errors).toBeDefined();
  });
});

describe("Project - Update", () => {
  it("should update a project", async () => {
    const skillRepo = datasource_test.getRepository(Skill);

    const skill1 = await skillRepo.save({
      name: "React",
      logo: "react.svg",
    });

    const skill2 = await skillRepo.save({
      name: "Node",
      logo: "node.svg",
    });

    const created = await createProject(skill1.id);

    const result = await exec(UPDATE_PROJECT, {
      input: {
        id: created.id,
        name: "Updated Project",
        skillIds: [skill2.id],
      },
    });

    expect(result.errors).toBeUndefined();

    const updated = (result.data as any).updateProject;

    expect(updated.name).toBe("Updated Project");
    expect(updated.skills[0].logo).toBe("node.svg");
  });

  it("should fail if project does not exist", async () => {
    const result = await exec(UPDATE_PROJECT, {
      input: {
        id: "fake-id",
        name: "Updated",
      },
    });

    expect(result.errors).toBeDefined();
  });

  it("should fail update if not connected", async () => {
    const result = await exec(
      UPDATE_PROJECT,
      {
        input: {
          id: "fake-id",
          name: "Should Fail",
        },
      },
      false,
    );

    expect(result.errors).toBeDefined();
  });
});

describe("Project - Delete", () => {
  it("should delete a project", async () => {
    const skillRepo = datasource_test.getRepository(Skill);

    const skill = await skillRepo.save({
      name: "React",
      logo: "react.svg",
    });

    const created = await createProject(skill.id);

    const result = await exec(DELETE_PROJECT, {
      deleteProjectId: created.id,
    });

    expect(result.errors).toBeUndefined();
    expect((result.data as any).deleteProject).toBe(true);
  });

  it("should fail delete if not connected", async () => {
    const result = await exec(
      DELETE_PROJECT,
      {
        deleteProjectId: "fake-id",
      },
      false,
    );

    expect(result.errors).toBeDefined();
  });
  it("should fail if project name already exists", async () => {
    const skillRepo = datasource_test.getRepository(Skill);
    const skill = await skillRepo.save({
      name: "React",
      logo: "react.svg",
    });

    await createProject(skill.id);

    const result = await exec(CREATE_PROJECT, {
      input: {
        name: "Initial Project",
        skillIds: [skill.id],
      },
    });

    expect(result.errors).toBeDefined();
  });
});
