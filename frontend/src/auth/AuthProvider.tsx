import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";
import { useMutation } from "@apollo/client/react";
import { CHECK_TOKEN } from "../requetes/mutations/auth.mutation";
import { AuthContext, type AuthUser, type ContextType } from "./auth.context";

type CheckTokenResponse = {
  checkToken: AuthUser | null;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [userInfo, setUserInfo] = useState<AuthUser | null>(null);

  const isAdmin = userInfo?.role === "ADMIN";

  const reset = useCallback(() => {
    setUserInfo(null);
  }, []);

  const [checkToken] = useMutation<CheckTokenResponse>(CHECK_TOKEN, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const user = data?.checkToken;
      if (user?.email) setUserInfo(user);
      else reset();
    },
    onError: reset,
  });

  const getInfos = useCallback(async () => {
    await checkToken();
  }, [checkToken]);

  useEffect(() => {
    void getInfos();
  }, [getInfos]);

  const value: ContextType = useMemo(
    () => ({
      userInfo,
      isAdmin,
      getInfos,
      reset,
    }),
    [userInfo, isAdmin, getInfos, reset],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
