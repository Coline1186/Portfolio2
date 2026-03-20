import { it, expect, vi, beforeEach, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "@/auth/Login";
import { AuthProvider } from "@/auth/AuthProvider";
import { ApolloProvider, MutationHookOptions } from "@apollo/client/react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DocumentNode,
} from "@apollo/client";

const navigateMock = vi.fn();
const mutateMock = vi.fn();
let loginResponse = {
  login: {
    success: true,
    message: "Bienvenue",
  },
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("@/auth/useAuth", () => ({
  useAuth: () => ({
    getInfos: vi.fn().mockResolvedValue(undefined),
    reset: vi.fn(),
    userInfo: null,
    isAdmin: false,
  }),
}));

vi.mock("@apollo/client/react", async () => {
  const actual = await vi.importActual<typeof import("@apollo/client/react")>(
    "@apollo/client/react",
  );
  const React = await vi.importActual<typeof import("react")>("react");

  return {
    ...actual,
    useMutation: (_query: DocumentNode, options?: MutationHookOptions) => {
      const [result, setResult] = React.useState({
        loading: false,
        error: null,
        data: null as typeof loginResponse | null,
      });

      mutateMock.mockImplementation(async () => {
        const response = loginResponse;

        setResult({
          loading: false,
          error: null,
          data: response,
        });

        if (options?.onCompleted) {
          options.onCompleted(response);
        }

        return { data: response };
      });

      return [mutateMock, result];
    },
  };
});

const mockApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
});

function renderLogin() {
  return render(
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ApolloProvider client={mockApolloClient}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </ApolloProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  loginResponse = {
    login: {
      success: true,
      message: "Bienvenue",
    },
  };
});

describe("Login", () => {
  it("submits login form and calls mutation", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.type(screen.getByLabelText(/email/i), "admin@test.com");
    await user.type(screen.getByLabelText(/mot de passe/i), "Password123!");

    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          input: {
            email: "admin@test.com",
            password: "Password123!",
          },
        },
      });
    });
  });

  it("redirects after successful login", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.type(screen.getByLabelText(/email/i), "admin@test.com");
    await user.type(screen.getByLabelText(/mot de passe/i), "Password123!");

    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/admin");
    });
  });

  it("shows error message on login failure", async () => {
    const user = userEvent.setup();

    loginResponse = {
      login: {
        success: false,
        message: "Email ou mot de passe incorrect",
      },
    };

    renderLogin();

    await user.type(screen.getByLabelText(/email/i), "admin@test.com");
    await user.type(screen.getByLabelText(/mot de passe/i), "wrong");

    await user.click(screen.getByRole("button", { name: /se connecter/i }));

    expect(
      await screen.findByText(/email ou mot de passe incorrect/i),
    ).toBeInTheDocument();
  });
});
