import { createContext } from "react";

export type AuthUser = {
  email: string;
  role: string;
};

export type ContextType = {
  userInfo: AuthUser | null;
  isAdmin: boolean;
  getInfos: () => Promise<void>;
  reset: () => void;
};

export const AuthContext = createContext<ContextType | undefined>(
  undefined
);
