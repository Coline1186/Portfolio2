import { ApolloServer } from "@apollo/server";
import typeDefs from "../../typeDefs";
import * as argon2 from "argon2";
import { User } from "../../entities/User.entity";
import datasource_test from "../../datasource/datasource_test";
import { makeExecutableSchema } from "@graphql-tools/schema";

jest.mock("../../datasource/datasource", () => ({
  __esModule: true,
  default: datasource_test,
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

let server: ApolloServer;

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

type ResponseDataRegister = {
  register: {
    id: string;
    email: string;
  };
};

type ResponseDataLogin = {
  login: {
    message: string;
    success: boolean;
  };
};

const createMockContext = () => ({
  req: {},
  res: {},
});

beforeAll(async () => {
  await datasource_test.initialize();

  const { default: userResolver } = await import(
    "../../resolvers/user.resolver"
  );
  const baseSchema = makeExecutableSchema({
    typeDefs,
    resolvers: [userResolver],
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
  await datasource_test.destroy();
});

describe("User - Register", () => {
  it("should register a new user", async () => {
    const result = await server.executeOperation<ResponseDataRegister>({
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

    const user = result.body.singleResult.data?.register;

    expect(user?.id).toBeDefined();
    expect(user?.email).toBe("test@example.com");
  });
});
describe("User - Login", () => {
  const userRepo = datasource_test.getRepository(User);
  const plainPassword = "Password123@";
  it("should login an existant user", async () => {
    const hashedPassword = await argon2.hash("Password123@");

    await userRepo.save({
      email: "test@example.com",
      password: hashedPassword,
    });
    const result = await server.executeOperation<ResponseDataLogin>(
      {
        query: LOGIN_USER,
        variables: {
          input: {
            email: "test@example.com",
            password: plainPassword,
          },
        },
      },
      {
        contextValue: createMockContext(),
      },
    );
    if (result.body.kind !== "single") {
      throw new Error("Unexpected incremental response");
    }

    expect(result.body.singleResult.errors).toBeUndefined();

    const loginResponse = result.body.singleResult.data?.login;

    expect(loginResponse?.success).toBe(true);
    expect(loginResponse?.message).toBe("Bienvenue");
  });
  it("should not login with wrong password", async () => {
    const hashedPassword = await argon2.hash("Password123@");

    await userRepo.save({
      email: "test@example1.com",
      password: hashedPassword,
    });
    const result = await server.executeOperation<ResponseDataLogin>(
      {
        query: LOGIN_USER,
        variables: {
          input: {
            email: "test@example1.com",
            password: "WrongPassword123@",
          },
        },
      },
      {
        contextValue: createMockContext(),
      },
    );

    if (result.body.kind !== "single") {
      throw new Error("Unexpected incremental response");
    }

    expect(result.body.singleResult.errors).toBeDefined();
    expect(result.body.singleResult.errors?.[0].message).toBe(
      "Email ou mot de passe incorrect",
    );
  });
});
