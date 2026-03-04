import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { CHECK_TOKEN } from "../requetes/mutations/auth.mutation";
import { useAuth } from "./useAuth";

type Props = {
  isAdminPage?: boolean;
};

type AuthUser = {
  email: string;
  role: string;
};

type CheckTokenResponse = {
  checkToken: AuthUser | null;
};

function ProtectedArea({ isAdminPage = false }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { reset } = useAuth();

  const [checkToken, { data, loading, error, called }] =
    useMutation<CheckTokenResponse>(CHECK_TOKEN, {
      fetchPolicy: "no-cache",
    });

  // 🔹 Lance la vérification au mount
  useEffect(() => {
    void checkToken();
  }, [checkToken]);

  // 🔹 Gère la logique de redirection
  useEffect(() => {
    if (!called || loading) return;

    if (error) {
      reset();
      navigate("/auth/login", {
        replace: true,
        state: { initialRoute: location.pathname },
      });
      return;
    }

    const user = data?.checkToken;

    if (!user) {
      reset();
      navigate("/auth/login", {
        replace: true,
        state: { initialRoute: location.pathname },
      });
      return;
    }

    if (isAdminPage && user.role !== "ADMIN") {
      navigate("/unauthorized", { replace: true });
    }
  }, [
    called,
    data,
    error,
    loading,
    navigate,
    location.pathname,
    isAdminPage,
    reset,
  ]);

  if (!called || loading) {
    return <div>Chargement...</div>;
  }

  return <Outlet />;
}

export default ProtectedArea;
