import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dataService } from "~/services";
import { setUnauthorizedHandler } from "~/services/http";
import { tokenStorage } from "~/services/tokenStorage";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(() => tokenStorage.get());

  const logout = useCallback(() => {
    tokenStorage.remove();
    setToken(undefined);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const { token } = await dataService.login(username, password);
    tokenStorage.set(token);
    setToken(token);
  }, []);

  // Token expiré/invalide sur n'importe quel appel → déconnexion
  useEffect(() => setUnauthorizedHandler(logout), [logout]);

  const value = useMemo(
    () => ({ isAuthenticated: Boolean(token), login, logout }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}