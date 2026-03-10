import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useAuth } from "@/auth/useAuth";
import { AuthProvider } from "@/auth/AuthProvider";


vi.mock("@apollo/client/react", () => ({
  useMutation: () => [
    vi.fn(),
    {
      data: null,
      loading: false,
      error: null,
      called: true,
    },
  ],
}));

function TestComponent() {
  const { isAdmin } = useAuth();
  return <div>{isAdmin ? "ADMIN" : "USER"}</div>;
}

describe("AuthProvider", () => {
  it("provides context values", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText("USER")).toBeInTheDocument();
  });
});
