import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "@/auth/auth.context";
import ProtectedArea from "@/auth/ProtectedArea";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: "/admin" }),
    Outlet: () => <div>Protected Content</div>,
  };
});

vi.mock("@apollo/client/react", () => ({
  useMutation: () => [
    vi.fn(),
    {
      data: { checkToken: null },
      loading: false,
      error: null,
      called: true,
    },
  ],
}));

beforeEach(() => {
  navigateMock.mockClear();
});

describe("ProtectedArea", () => {
  it("redirects to login when user not authenticated", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            userInfo: null,
            isAdmin: false,
            getInfos: async () => {},
            reset: vi.fn(),
          }}
        >
          <ProtectedArea />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(navigateMock).toHaveBeenCalled();
  });
});
