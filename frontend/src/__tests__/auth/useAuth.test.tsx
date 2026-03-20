import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { AuthContext } from "@/auth/auth.context";
import { useAuth } from "@/auth/useAuth";

function TestComponent() {
  const { userInfo } = useAuth();
  return <div>{userInfo?.email}</div>;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useAuth", () => {
  it("throws error if used outside AuthProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onWindowError = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("error", onWindowError);

    try {
      expect(() => render(<TestComponent />)).toThrow(
        "useAuth must be used within AuthProvider",
      );
    } finally {
      window.removeEventListener("error", onWindowError);
    }
  });

  it("returns context value inside provider", () => {
    const wrapper = (
      <AuthContext.Provider
        value={{
          userInfo: { email: "test@test.com", role: "ADMIN" },
          isAdmin: true,
          getInfos: async () => {},
          reset: () => {},
        }}
      >
        <TestComponent />
      </AuthContext.Provider>
    );

    const { getByText } = render(wrapper);

    expect(getByText("test@test.com")).toBeInTheDocument();
  });
});
