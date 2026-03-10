import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AuthContext } from "@/auth/auth.context";
import { useAuth } from "@/auth/useAuth";

function TestComponent() {
  const { userInfo } = useAuth();
  return <div>{userInfo?.email}</div>;
}

describe("useAuth", () => {
  it("throws error if used outside AuthProvider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useAuth must be used within AuthProvider",
    );
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
