// context/AuthContext.tsx
"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);

  const login = (userData: User) => {
    setUser(userData);
    // In a real app, you would set cookies or session here
  };

  const logout = () => {
    setUser(null);
    // Clear auth tokens in a real app
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
