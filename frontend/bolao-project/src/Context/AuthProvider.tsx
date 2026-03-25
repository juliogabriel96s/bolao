import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../services/api";

interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "USER"
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    const response = await api.post("/sessions", {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    setUser(user);
  }

  function signOut() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}