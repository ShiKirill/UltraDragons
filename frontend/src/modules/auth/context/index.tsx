"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // TODO: Implement authentication check
    setIsAuthenticated(true);
    setIsHydrated(true);
  }, []);

  const handleAuthenticate = useCallback(() => {
    // TODO: Implement authentication
  }, []);

  const handleLogout = useCallback(async () => {
    // TODO: Implement logout
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      isHydrated,
      authenticate: handleAuthenticate,
      logout: handleLogout,
    }),
    [isAuthenticated, isLoading, isHydrated, handleAuthenticate, handleLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
