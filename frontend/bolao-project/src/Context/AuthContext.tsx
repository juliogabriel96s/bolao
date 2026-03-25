import { createContext } from "react";

interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "USER"
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType);