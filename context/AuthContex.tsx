import { User } from "@/domain/models/user";
import { loginUseCaseImpl } from "@/domain/useCases/login/LoginUseCaseImpl";
import { registerUseCaseImpl } from "@/domain/useCases/register/RegisterUseCaseImpl";
import { createContext, useContext, useState } from "react";

const loginUseCase = loginUseCaseImpl;
const registerUseCase = registerUseCaseImpl;

interface IAuthContext {
  user: User | null;
  UID: string;
  displayName: string;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [UID, setUID] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await loginUseCase.execute(email, password);
    if ("user" in result) {
      console.log("Login bem-sucedido", result.user);
      setUser(result.user);
      setUID(result.user?.id || "");
      setIsAuthenticated(true);
      return true; // Retorna true quando login é bem-sucedido
    } else {
      console.error("Login failed:", result.message);
      setIsAuthenticated(false);
      return false; // Retorna false quando login falha
    }
  };

  const signup = async (email: string, password: string) => {
    const result = await registerUseCase.execute(email, password);
    if (result) {
      console.log("User registered successfully");
      return true;
    }
    return false;
  };

  const contextValue: IAuthContext = {
    user,
    UID,
    displayName: "Fiap Farm User", // Placeholder for display name
    login,
    signup,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
